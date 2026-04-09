"""
INTERMEDIATE DEMO: same OpenAI call as production, but the response shows
both *raw* model text and *filtered* text side by side.

Teaching point: never ship raw model output to users without a policy pass.
The Advanced route only returns the filtered side and adds extra API hardening.
"""

from __future__ import annotations

from openai import OpenAI

from core.config import settings
from services.input_sanitizer import SanitizeError, sanitize_user_text
from services.output_filter import filter_model_text


def _client() -> OpenAI:
    if not settings.OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not configured on the server.")
    return OpenAI(api_key=settings.OPENAI_API_KEY)


def completion_raw_and_filtered(user_message: str) -> dict:
    """Sanitize input, call the model, return raw + filtered outputs."""
    try:
        safe_prompt = sanitize_user_text(
            user_message,
            max_length=1500,
            escape_html=False,
        )
    except SanitizeError as exc:
        raise ValueError(str(exc)) from exc

    client = _client()
    system = (
        "You are a helpful assistant. "
        "You may include markdown code fences and links when it helps explain."
    )
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": safe_prompt},
        ],
        temperature=0.5,
        max_tokens=600,
        timeout=30.0,
    )
    raw = (response.choices[0].message.content or "").strip()
    filtered = filter_model_text(raw, max_length=4000)

    return {
        "raw_reply": raw,
        "filtered_reply": filtered,
        "model": settings.OPENAI_MODEL,
    }
