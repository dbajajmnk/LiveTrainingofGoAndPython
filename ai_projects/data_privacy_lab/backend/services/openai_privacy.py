"""OpenAI call using only pre-sanitized user text."""

from __future__ import annotations

from openai import OpenAI

from core.config import settings
from services.privacy_filter import filter_model_output


def _client() -> OpenAI:
    if not settings.OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not set in the server environment.")
    return OpenAI(api_key=settings.OPENAI_API_KEY)


def ask_with_clean_prompt(sanitized_user_text: str) -> tuple[str, list[str]]:
    """
    Send sanitized text only. Second return value lists output redaction categories
    if the filter changed the model text.
    """
    client = _client()
    system = (
        "You are a concise support coach for a privacy engineering workshop. "
        "Never ask the user to paste passwords, full card numbers, or government IDs. "
        "Answer in plain language, at most 6 short bullet points."
    )
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": sanitized_user_text[:8000]},
        ],
        temperature=0.35,
        max_tokens=450,
        timeout=45.0,
    )
    raw = (response.choices[0].message.content or "").strip()
    safe, rules = filter_model_output(raw)
    return safe, rules
