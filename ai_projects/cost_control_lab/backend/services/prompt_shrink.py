"""
BEGINNER CONCEPT: shrink what you send.

Long prompts burn input tokens. Production apps often:
- summarize history
- trim attachments
- use structured fields instead of one giant string
"""

from __future__ import annotations

from core.config import settings


def shrink_user_text(raw: str) -> tuple[str, bool]:
    """
    Trim whitespace and enforce PROMPT_MAX_CHARS.

    Returns (text_sent_to_model, was_truncated).
    """
    text = raw.strip()
    if not text:
        return "", False
    limit = max(1, settings.PROMPT_MAX_CHARS)
    if len(text) <= limit:
        return text, False
    return text[:limit], True


def teaching_prompt(user_part: str) -> str:
    """
    Wrap user text in a short system-style instruction to keep answers brief.

    Shorter *expected* answers → fewer output tokens (paired with max_tokens on the API).
    """
    return (
        "Answer in at most 5 short bullet points. Be concrete. No preamble.\n\n"
        f"Question / topic:\n{user_part}"
    )
