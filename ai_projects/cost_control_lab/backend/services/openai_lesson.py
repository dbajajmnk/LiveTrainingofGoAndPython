"""
Shared OpenAI call path for Intermediate + Advanced tabs.

Shows: truncation, max_output_tokens, optional cache, usage from API response.
"""

from __future__ import annotations

from openai import OpenAI

from core.config import settings
from services.prompt_shrink import shrink_user_text, teaching_prompt
from services.response_cache import cache
from services.session_monitor import monitor
from services.token_count import count_tokens


def _client() -> OpenAI:
    if not settings.OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not set.")
    return OpenAI(api_key=settings.OPENAI_API_KEY)


def run_lesson_call(
    raw_user_text: str,
    *,
    use_cache: bool,
    record_monitor: bool,
) -> dict:
    """
    Execute one teaching completion.

    record_monitor: Advanced tab passes True so session totals update every time
    (cache hits still count as “saved API call” in the narrative).
    """
    shrunk, truncated = shrink_user_text(raw_user_text)
    if not shrunk:
        raise ValueError("Text cannot be empty.")

    full_prompt = teaching_prompt(shrunk)
    model = settings.OPENAI_MODEL
    max_out = settings.MAX_OUTPUT_TOKENS

    if use_cache:
        hit = cache.get(model, full_prompt, max_out)
        if hit is not None:
            if record_monitor:
                monitor.record_cache_hit()
            return {
                "reply": hit,
                "cache_hit": True,
                "model": model,
                "truncated_input": truncated,
                "prompt_sent_preview": full_prompt[:280] + ("…" if len(full_prompt) > 280 else ""),
                "max_output_tokens": max_out,
                "usage": None,
                "tiktoken_estimate_sent_prompt": count_tokens(full_prompt),
                "lesson": "Cache returned the same answer without a new API request → $0 for that call.",
            }

    client = _client()
    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "You are a concise tutor for a cost-control workshop.",
            },
            {"role": "user", "content": full_prompt},
        ],
        max_tokens=max_out,
        temperature=0.4,
        timeout=45.0,
    )
    reply = (response.choices[0].message.content or "").strip()
    usage = response.usage
    pt = usage.prompt_tokens if usage else 0
    ct = usage.completion_tokens if usage else 0

    cache.set(model, full_prompt, max_out, reply)
    if record_monitor:
        monitor.record_api(pt, ct)

    return {
        "reply": reply,
        "cache_hit": False,
        "model": model,
        "truncated_input": truncated,
        "prompt_sent_preview": full_prompt[:280] + ("…" if len(full_prompt) > 280 else ""),
        "max_output_tokens": max_out,
        "usage": {
            "prompt_tokens": pt,
            "completion_tokens": ct,
            "total_tokens": pt + ct,
        },
        "tiktoken_estimate_sent_prompt": count_tokens(full_prompt),
        "lesson": "Compare `usage.prompt_tokens` from OpenAI with tiktoken on the same text — "
        "billing uses the API’s counts.",
    }
