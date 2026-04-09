"""
INTERMEDIATE + ADVANCED: central “privacy filter” before/after the model.

Order matters: remove high-risk structured secrets before broad digit patterns.
"""

from __future__ import annotations

import re

# Payment / ID style patterns (demo quality — extend with your compliance team’s rules).
_CARD = re.compile(r"\b(?:\d{4}[\s-]?){3}\d{4}\b")
# Aadhaar-style 12 digits, often grouped 4-4-4.
_AADHAAR = re.compile(r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b")
# US SSN-style (teaching only).
_SSN = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
_EMAIL = re.compile(r"[\w.+-]+@[\w.-]+\.[\w.-]+", re.IGNORECASE)
# Indian + generic 10-digit phones.
_PHONE = re.compile(r"\b(?:\+91[\s-]?)?[6789]\d{9}\b|\b\d{10}\b")
# password=secret, password: secret
_PASSWORD = re.compile(
    r"password\s*[:=]\s*\S+",
    re.IGNORECASE,
)
_API_KEY = re.compile(
    r"\b(sk|pk)_(live|test)_[A-Za-z0-9]{8,}\b",
    re.IGNORECASE,
)


def sanitize_for_ai(text: str) -> tuple[str, list[str]]:
    """
    Redact common sensitive substrings before text leaves your trust boundary.

    Returns (sanitized_text, list of human-readable rule names that matched).
    """
    applied: list[str] = []
    s = text

    def run(pattern: re.Pattern[str], label: str, replacement: str) -> None:
        nonlocal s
        if pattern.search(s):
            applied.append(label)
            s = pattern.sub(replacement, s)

    run(_CARD, "card", "[CARD_REDACTED]")
    run(_AADHAAR, "aadhaar_like", "[ID_REDACTED]")
    run(_SSN, "ssn_like", "[ID_REDACTED]")
    run(_EMAIL, "email", "[EMAIL_REDACTED]")
    run(_PHONE, "phone", "[PHONE_REDACTED]")
    run(_PASSWORD, "password", "password=[REDACTED]")
    run(_API_KEY, "api_key", "[API_KEY_REDACTED]")

    return s, applied


def filter_model_output(text: str) -> tuple[str, list[str]]:
    """
    Defense in depth: run the same redaction pass on *model output*.

    Models should not echo secrets, but assume they might — filter before UI/logs.
    """
    return sanitize_for_ai(text)
