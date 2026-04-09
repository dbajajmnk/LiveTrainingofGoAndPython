"""
Data Privacy Lab — FastAPI teaching API

Maps to your Theory.md levels:
1. Beginner — mask email & phone (no OpenAI)
2. Intermediate — privacy filter + OpenAI on sanitized text only
3. Advanced — sanitize, masked log line, minimal in-memory store + 30-day retention,
   optional stale-row injection for live demos

Run from `backend/`:
    pip install -r requirements.txt
    copy .env.example .env
    uvicorn main:app --reload --port 8012
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.masking import beginner_mask
from services.memory_store import add_minimal_record, inject_stale_record_for_demo, store_stats
from services.openai_privacy import ask_with_clean_prompt
from services.privacy_filter import sanitize_for_ai
from services.safe_logging import build_safe_log_line

app = FastAPI(
    title="Data Privacy Lab",
    version="0.1.0",
    description="Teach masking, prompt sanitization, safe logs, and retention without a real database.",
)

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


class TextIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=12000)


class PrivacyFlowIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=12000)
    # Fake tenant/user id for access-control storytelling — not authentication.
    user_id: str = Field(default="student-demo", max_length=64)


@app.get("/api/health")
def health():
    from core.config import settings

    return {
        "status": "ok",
        "openai_configured": bool(settings.OPENAI_API_KEY),
        "store": store_stats(),
    }


@app.post("/api/beginner/mask")
def beginner_mask_endpoint(body: TextIn):
    """
    BEGINNER: mask email + phone only.

    Does **not** call OpenAI — safe for classrooms with billing disabled.
    """
    return beginner_mask(body.text)


@app.post("/api/intermediate/ask")
def intermediate_ask(body: TextIn):
    """
    INTERMEDIATE: run the full privacy filter, then call OpenAI.

    Response shows *sanitized* text preview + which rules fired + model answer
    (also passed through an output redaction pass).
    """
    sanitized, rules_in = sanitize_for_ai(body.text)
    if not sanitized.strip():
        raise HTTPException(status_code=400, detail="Nothing left after sanitization — try less toxic test data.")

    try:
        reply, rules_out = ask_with_clean_prompt(sanitized)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc

    return {
        "sanitized_prompt_preview": sanitized[:900] + ("…" if len(sanitized) > 900 else ""),
        "input_rules_applied": rules_in,
        "output_rules_applied": rules_out,
        "model_reply": reply,
        "explain": "Only `sanitized_prompt_preview` was sent to the model; reply was scanned again before return.",
    }


@app.post("/api/advanced/privacy-flow")
def advanced_privacy_flow(body: PrivacyFlowIn):
    """
    ADVANCED: sanitize → safe log line → store minimal row → OpenAI → output filter → retention purge.

    This is the “full lifecycle” story in one JSON payload for presenters.
    """
    sanitized, rules_in = sanitize_for_ai(body.text)
    if not sanitized.strip():
        raise HTTPException(status_code=400, detail="Nothing left after sanitization.")

    log_line = build_safe_log_line(
        user_id=body.user_id,
        action="privacy_flow",
        detail=sanitized,
    )
    record, purged = add_minimal_record(
        user_id=body.user_id,
        issue_summary_sanitized=sanitized[:400],
    )

    try:
        reply, rules_out = ask_with_clean_prompt(sanitized)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="OpenAI request failed.") from exc

    return {
        "sanitized_prompt_preview": sanitized[:900] + ("…" if len(sanitized) > 900 else ""),
        "input_rules_applied": rules_in,
        "masked_log_line": log_line,
        "stored_minimal_record": {
            "id": record.id,
            "user_id": record.user_id,
            "issue_summary": record.issue_summary,
            "created_at": record.created_at.isoformat(),
        },
        "records_purged_this_request": purged,
        "store_stats_after": store_stats(),
        "model_reply": reply,
        "output_rules_applied": rules_out,
        "lesson": "We never persist the raw message — only a sanitized summary + metadata. "
        "Logs use the same redaction pass as the AI path.",
    }


@app.post("/api/advanced/inject-stale-record")
def inject_stale():
    """
    Teaching helper: add a row older than the retention window.

    Call `POST /api/advanced/privacy-flow` afterward and watch `records_purged_this_request`.
    """
    return inject_stale_record_for_demo()


@app.get("/api/advanced/store-stats")
def get_store_stats():
    return store_stats()
