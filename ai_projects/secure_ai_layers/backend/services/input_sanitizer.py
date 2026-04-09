"""
BEGINNER CONCEPT: Sanitize user input before you use it anywhere
(API calls, logs, HTML, prompts, etc.).

Goals for learners:
- Reject or normalize obviously dangerous patterns (injection-style strings).
- Enforce length limits so one user cannot blow up cost or context.
- Treat all client input as untrusted, even from "logged-in" users later.

This is intentionally small and readable — production apps often use
dedicated libraries plus allow-lists for structured fields.
"""

from __future__ import annotations

import html
import re

# Disallow null bytes and control characters that often break parsers / logs.
_CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")

# Very small demo list: in real systems you combine allow-lists, encoding, and WAF rules.
_SUSPICIOUS_PATTERNS = (
    r"<\s*script",
    r"javascript\s*:",
    r"on\w+\s*=",  # onclick=, onerror=, ...
)


class SanitizeError(ValueError):
    """Raised when input cannot be safely accepted."""


def sanitize_user_text(
    raw: str,
    *,
    max_length: int = 2000,
    escape_html: bool = True,
) -> str:
    """
    Normalize and validate a single user-supplied text field.

    Steps:
    1. Strip outer whitespace.
    2. Reject empty after strip.
    3. Remove / reject control characters.
    4. Enforce max length (after strip).
    5. Optionally HTML-escape for safe display (prevents XSS if echoed in a browser).
    6. Reject a few classic injection-style substrings (teaching hook, not full WAF).
    """
    if raw is None:
        raise SanitizeError("Input is required.")

    text = raw.strip()
    if not text:
        raise SanitizeError("Input cannot be empty.")

    if _CONTROL_CHARS.search(text):
        raise SanitizeError("Input contains disallowed control characters.")

    if len(text) > max_length:
        raise SanitizeError(f"Input exceeds maximum length ({max_length} characters).")

    lower = text.lower()
    for pattern in _SUSPICIOUS_PATTERNS:
        if re.search(pattern, lower, re.IGNORECASE):
            raise SanitizeError("Input contains a disallowed pattern.")

    if escape_html:
        # Safe for inserting into HTML/React text nodes when you still treat it as untrusted.
        text = html.escape(text, quote=True)

    return text
