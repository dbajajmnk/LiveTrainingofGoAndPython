"""
Logging is a common privacy leak: operators ship logs to third parties or leave them world-readable.

We never log raw user text in production demos — this helper shows a *safe* log line shape.
"""

from __future__ import annotations

from services.privacy_filter import sanitize_for_ai


def build_safe_log_line(*, user_id: str, action: str, detail: str) -> str:
    """
    Build one redacted log line. `detail` is run through the same filter as AI-bound text.
    """
    safe_detail, _rules = sanitize_for_ai(detail)
    # Truncate so huge pastes do not fill log sinks.
    clipped = safe_detail[:160] + ("…" if len(safe_detail) > 160 else "")
    return f"ts=… level=INFO user_id={user_id} action={action} detail={clipped}"
