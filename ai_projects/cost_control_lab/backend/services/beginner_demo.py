"""
BEGINNER: no OpenAI call — only measure how much we *would* spend on input tokens.

Audience sees character counts + tiktoken before/after applying PROMPT_MAX_CHARS.
"""

from __future__ import annotations

from core.config import settings
from services.prompt_shrink import shrink_user_text, teaching_prompt
from services.token_count import count_tokens


def analyze_input_costs(raw: str) -> dict:
    text = raw.strip()
    if not text:
        raise ValueError("Text cannot be empty.")

    # “What if we naively wrapped the whole thing?” — cap at 12k chars so demos stay fast.
    naive_body = text[:12000]
    naive_prompt = teaching_prompt(naive_body)

    shrunk, was_truncated = shrink_user_text(text)
    shrunk_prompt = teaching_prompt(shrunk)

    t_naive = count_tokens(naive_prompt)
    t_shrunk = count_tokens(shrunk_prompt)

    return {
        "original_characters": len(text),
        "characters_after_shrink": len(shrunk),
        "prompt_max_chars_setting": settings.PROMPT_MAX_CHARS,
        "input_was_truncated": was_truncated,
        "tiktoken_naive_prompt": t_naive,
        "tiktoken_after_shrink_prompt": t_shrunk,
        "estimated_input_tokens_saved": max(0, t_naive - t_shrunk),
        "naive_prompt_preview": naive_prompt[:400] + ("…" if len(naive_prompt) > 400 else ""),
        "shrunk_prompt_preview": shrunk_prompt[:400] + ("…" if len(shrunk_prompt) > 400 else ""),
        "explain": (
            "Smaller prompts usually mean fewer input tokens → lower cost. "
            "This tab never calls OpenAI; it only counts tokens locally."
        ),
    }
