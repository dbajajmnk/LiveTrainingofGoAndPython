"""
Token counting for teaching (not billing).

We use tiktoken with the cl100k_base vocabulary — close enough for classroom demos
for many chat models. Official invoices use OpenAI’s own token accounting.
"""

from __future__ import annotations

import tiktoken

# Widely compatible encoder; swap if you standardize on another for your stack.
_ENCODING = tiktoken.get_encoding("cl100k_base")


def count_tokens(text: str) -> int:
    """Return approximate token count for a string."""
    if not text:
        return 0
    return len(_ENCODING.encode(text))
