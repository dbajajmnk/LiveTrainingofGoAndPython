"""
Cost Control Lab — FastAPI teaching API

Three audience-facing levels (maps to your Theory.md exercises):
1. Beginner — measure prompt size / token savings (no API spend)
2. Intermediate — real OpenAI call + LRU cache + max_output_tokens cap
3. Advanced — same as intermediate but every action updates a session “cost monitor”
   plus a stricter rate limit to simulate production guardrails

Run from `backend/`:
    pip install -r requirements.txt
    copy .env.example .env
    uvicorn main:app --reload --port 8011
"""

from __future__ import annotations

import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.beginner_demo import analyze_input_costs
from services.openai_lesson import run_lesson_call
from services.session_monitor import monitor

app = FastAPI(
    title="Cost Control Lab",
    version="0.1.0",
    description="Teach token awareness, caching, caps, and session usage without a database.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=12000)


class AskIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=12000)
    # Toggle off to show repeated identical spend (same question → new API call each time).
    use_cache: bool = True


# --- Rate limit (Advanced tab): tighter than unlimited classroom spam ---

_rate_buckets: dict[str, list[float]] = defaultdict(list)
_ADV_WINDOW_SEC = 60.0
_ADV_MAX = 12


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def _enforce_advanced_rate_limit(request: Request) -> None:
    now = time.monotonic()
    ip = _client_ip(request)
    bucket = _rate_buckets[ip]
    cutoff = now - _ADV_WINDOW_SEC
    while bucket and bucket[0] < cutoff:
        bucket.pop(0)
    if len(bucket) >= _ADV_MAX:
        raise HTTPException(
            status_code=429,
            detail="Advanced demo rate limit — wait a minute (simulates protecting budget).",
        )
    bucket.append(now)


@app.get("/api/health")
def health():
    from core.config import settings

    return {
        "status": "ok",
        "openai_configured": bool(settings.OPENAI_API_KEY),
        "session": monitor.snapshot(),
    }


@app.get("/api/session/stats")
def session_stats():
    """Poll without calling OpenAI — useful when presenting the dashboard."""
    return monitor.snapshot()


@app.post("/api/beginner/analyze")
def beginner_analyze(body: TextIn):
    """No external API — token math only."""
    try:
        return analyze_input_costs(body.text)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/api/intermediate/ask")
def intermediate_ask(body: AskIn):
    """
    OpenAI chat completion with prompt shrink, max_tokens, optional in-memory cache.

    Does not update the Advanced session totals (keeps the story split for the UI).
    """
    try:
        return run_lesson_call(body.text, use_cache=body.use_cache, record_monitor=False)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc


@app.post("/api/advanced/monitor")
def advanced_monitor(request: Request, body: AskIn):
    """
    Same completion path, but:
    - increments session counters (tokens + cache hits)
    - enforces a per-IP rate limit
    """
    _enforce_advanced_rate_limit(request)
    try:
        payload = run_lesson_call(body.text, use_cache=body.use_cache, record_monitor=True)
        payload["session_totals"] = monitor.snapshot()
        return payload
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc
