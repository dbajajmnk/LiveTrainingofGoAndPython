"""
Secure AI Layers — teaching API

Three levels in one small app:
1. Beginner:  sanitize input only
2. Intermediate: call OpenAI + show raw vs filtered output
3. Advanced:    optional client API key + rate limit + single safe JSON response

Run from the `backend` folder:
    pip install -r requirements.txt
    copy .env.example .env   # add OPENAI_API_KEY
    uvicorn main:app --reload --port 8010
"""

from __future__ import annotations

import time
from collections import defaultdict
from typing import Annotated

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from core.config import settings
from services.input_sanitizer import SanitizeError, sanitize_user_text
from services.intermediate_demo import completion_raw_and_filtered
from services.secure_openai import secure_completion

app = FastAPI(
    title="Secure AI Layers (Teaching)",
    version="0.1.0",
    description="Beginner → Intermediate → Advanced security concepts without a database.",
)

# Frontend (Vite) runs on another origin during dev — allow it explicitly.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request bodies (Pydantic validates shape before your code runs) ---


class TextIn(BaseModel):
    """Single user text field — keep APIs small and explicit."""

    text: str = Field(..., min_length=1, max_length=5000)


# --- In-memory rate limit (Advanced only) — resets when process restarts ---

_rate_buckets: dict[str, list[float]] = defaultdict(list)
_RATE_WINDOW_SEC = 60.0
_RATE_MAX = 15  # requests per window per client IP (demo tuning)


def _client_ip(request: Request) -> str:
    """Best-effort client id for demo rate limiting."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def _enforce_rate_limit(request: Request) -> None:
    """Sliding window limiter — good enough for classroom demos."""
    now = time.monotonic()
    ip = _client_ip(request)
    bucket = _rate_buckets[ip]
    # Drop timestamps outside the window
    cutoff = now - _RATE_WINDOW_SEC
    while bucket and bucket[0] < cutoff:
        bucket.pop(0)
    if len(bucket) >= _RATE_MAX:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Slow down or wait a minute (demo rate limit).",
        )
    bucket.append(now)


def _require_demo_api_key(x_api_key: str | None) -> None:
    """
    If DEMO_API_KEY is set in the server environment, require matching X-API-Key.

    This is NOT a user database — it simulates "only our frontend knows the secret"
    while the real OpenAI key never leaves the server.
    """
    expected = (settings.DEMO_API_KEY or "").strip()
    if not expected:
        return
    if not x_api_key or x_api_key.strip() != expected:
        raise HTTPException(status_code=401, detail="Invalid or missing X-API-Key.")


# --- Routes ---


@app.get("/api/health")
def health():
    return {"status": "ok", "openai_configured": bool(settings.OPENAI_API_KEY)}


@app.post("/api/beginner/sanitize")
def beginner_sanitize(body: TextIn):
    """
    BEGINNER: validate + sanitize only.

    Returns HTML-escaped text safe to show inside a web page text node.
    """
    try:
        safe = sanitize_user_text(body.text, max_length=2000, escape_html=True)
    except SanitizeError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {
        "sanitized": safe,
        "hint": "Compare with your original input in the UI. Dangerous patterns are rejected.",
    }


@app.post("/api/intermediate/complete")
def intermediate_complete(body: TextIn):
    """
    INTERMEDIATE: OpenAI completion with output filtering lesson.

    Response includes both `raw_reply` and `filtered_reply` so learners
    can see what the filter removes or changes.
    """
    try:
        return completion_raw_and_filtered(body.text)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        # Do not leak stack traces to clients
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc


@app.post("/api/advanced/secure-chat")
def advanced_secure_chat(
    request: Request,
    body: TextIn,
    x_api_key: Annotated[str | None, Header()] = None,
):
    """
    ADVANCED: optional shared secret + rate limit + sanitize + model + filter.

    - OpenAI key: server only (.env)
    - X-API-Key: optional extra gate (set DEMO_API_KEY in .env)
    - Rate limit: per-IP in memory
    """
    _require_demo_api_key(x_api_key)
    _enforce_rate_limit(request)
    try:
        return secure_completion(body.text)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc
