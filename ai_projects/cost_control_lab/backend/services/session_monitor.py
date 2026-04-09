"""
ADVANCED CONCEPT: aggregate usage so operators see cost drivers.

Real products pipe this to metrics (Prometheus), billing tables, or FinOps dashboards.
Here we keep simple counters in RAM for live demos.
"""

from __future__ import annotations

import threading
from dataclasses import dataclass, field

from core.config import settings


@dataclass
class SessionMonitor:
    """Thread-safe counters for this uvicorn process."""

    lock: threading.Lock = field(default_factory=threading.Lock)
    api_calls: int = 0
    cache_hits: int = 0
    prompt_tokens: int = 0
    completion_tokens: int = 0

    def record_api(self, prompt_t: int, completion_t: int) -> None:
        with self.lock:
            self.api_calls += 1
            self.prompt_tokens += prompt_t
            self.completion_tokens += completion_t

    def record_cache_hit(self) -> None:
        with self.lock:
            self.cache_hits += 1

    def snapshot(self) -> dict:
        with self.lock:
            pt = self.prompt_tokens
            ct = self.completion_tokens
            calls = self.api_calls
            hits = self.cache_hits
        # Rough illustrative cost — multiply “per million” by tokens / 1e6.
        in_price = settings.USD_PER_M_INPUT_TOKENS
        out_price = settings.USD_PER_M_OUTPUT_TOKENS
        est = (pt / 1_000_000) * in_price + (ct / 1_000_000) * out_price
        return {
            "api_calls_to_openai": calls,
            "cache_hits": hits,
            "total_prompt_tokens": pt,
            "total_completion_tokens": ct,
            "total_tokens": pt + ct,
            "estimated_usd_since_boot": round(est, 6),
            "pricing_note": "USD uses USD_PER_M_* from .env for demo only — check OpenAI pricing.",
        }


monitor = SessionMonitor()
