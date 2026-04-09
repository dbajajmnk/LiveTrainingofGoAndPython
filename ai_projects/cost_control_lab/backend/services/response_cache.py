"""
INTERMEDIATE CONCEPT: cache identical (or normalized) requests.

If two users ask the same thing, you can skip a second API call.
This demo uses an in-memory LRU — production would use Redis + TTL + auth scoping.
"""

from __future__ import annotations

import hashlib
from collections import OrderedDict

from core.config import settings


class ResponseLRUCache:
    """Tiny LRU keyed by hash(model, prompt, max_output_tokens)."""

    def __init__(self, max_entries: int) -> None:
        self._max = max(1, max_entries)
        self._data: OrderedDict[str, str] = OrderedDict()

    def _make_key(self, model: str, prompt: str, max_out: int) -> str:
        payload = f"{model}\n{max_out}\n{prompt}".encode("utf-8")
        return hashlib.sha256(payload).hexdigest()

    def get(self, model: str, prompt: str, max_out: int) -> str | None:
        key = self._make_key(model, prompt, max_out)
        if key not in self._data:
            return None
        self._data.move_to_end(key)
        return self._data[key]

    def set(self, model: str, prompt: str, max_out: int, reply: str) -> None:
        key = self._make_key(model, prompt, max_out)
        if key in self._data:
            self._data.move_to_end(key)
        self._data[key] = reply
        while len(self._data) > self._max:
            self._data.popitem(last=False)


# One shared cache for the running process (demo only).
cache = ResponseLRUCache(settings.CACHE_MAX_ENTRIES)
