"""
BEGINNER CONCEPT: mask obvious PII patterns so humans (and demos) see less exposure.

This is intentionally small and regex-based. Production systems often combine:
allow-lists, NLP entity detection, DLP tools, and policy review.
"""

from __future__ import annotations

import re

# Email (practical subset for teaching).
_EMAIL = re.compile(r"[\w.+-]+@[\w.-]+\.[\w.-]+", re.IGNORECASE)

# 10-digit numbers (Indian-style mobiles often start 6–9; also catches naive US-style demos).
_PHONE_10 = re.compile(r"\b[6789]\d{9}\b|\b\d{10}\b")


def mask_email_literal(email: str) -> str:
    """Mask local-part of an email; keep domain for context in class demos."""
    parts = email.split("@", 1)
    if len(parts) != 2:
        return email
    name, domain = parts
    if len(name) <= 2:
        return "*" * len(name) + "@" + domain
    return name[:2] + "***@" + domain


def mask_emails_in_text(text: str) -> str:
    def _sub(m: re.Match[str]) -> str:
        return mask_email_literal(m.group(0))

    return _EMAIL.sub(_sub, text)


def mask_phones_in_text(text: str) -> str:
    return _PHONE_10.sub("[PHONE_REDACTED]", text)


def beginner_mask(text: str) -> dict:
    """
    Apply email + phone masking only (Beginner tab).

    Returns the masked string plus which categories fired (for UI badges).
    """
    applied: list[str] = []
    step = text
    if _EMAIL.search(step):
        applied.append("email")
        step = mask_emails_in_text(step)
    if _PHONE_10.search(step):
        applied.append("phone")
        step = mask_phones_in_text(step)
    return {
        "masked_text": step,
        "categories_masked": applied,
        "note": "Compare with your original input — nothing is sent to OpenAI in this tab.",
    }
