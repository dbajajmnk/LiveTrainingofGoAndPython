"""
INTERMEDIATE CONCEPT: Filter model output before sending it to clients.

Why this matters:
- Models can hallucinate, leak training-like patterns, or echo unsafe content.
- You should define what "safe enough" means for your product (PII, profanity,
  markdown, links, length, etc.).

This module runs AFTER you get text from OpenAI and BEFORE you return JSON
to the browser. It pairs with input sanitization (defense in depth).
"""

from __future__ import annotations

import re

# Strip common markdown code fences so raw HTML-like payloads are less likely to slip through.
_FENCE = re.compile(r"```[\s\S]*?```", re.MULTILINE)

# Remove http(s) links in demo (teaching: decide your policy — allow, block, or rewrite).
_URL = re.compile(r"https?://\S+", re.IGNORECASE)


def filter_model_text(text: str, *, max_length: int = 4000) -> str:
    """
    Apply conservative filters suitable for a teaching demo.

    Real pipelines might:
    - run a moderation API (OpenAI Moderation, etc.)
    - scan for secrets / API keys with regex + entropy checks
    - allow markdown but sanitize with a trusted parser
    """
    if not text:
        return ""

    cleaned = text.strip()

    # Collapse triple-backtick blocks to a short placeholder (avoid huge pasted code dumps).
    cleaned = _FENCE.sub("[removed code block]", cleaned)

    # Demo policy: remove raw URLs (product decision — document it for your team).
    cleaned = _URL.sub("[removed link]", cleaned)

    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length] + "\n… [truncated]"

    return cleaned
