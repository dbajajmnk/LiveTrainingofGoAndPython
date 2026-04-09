"""
ADVANCED CONCEPT: in-memory “database” with retention — no external DB for the lab.

Production would use encrypted storage + TTL indexes + legal holds.
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class MinimalRecord:
    """Only what we need for a fake support ticket — no raw PII from the user message."""

    id: str
    user_id: str
    issue_summary: str  # already sanitized / truncated
    created_at: datetime


_RECORDS: list[MinimalRecord] = []
_RETENTION_DAYS = 30


def purge_expired() -> int:
    """Delete records older than `_RETENTION_DAYS`. Returns how many rows removed."""
    global _RECORDS
    cutoff = _utcnow() - timedelta(days=_RETENTION_DAYS)
    before = len(_RECORDS)
    _RECORDS = [r for r in _RECORDS if r.created_at >= cutoff]
    return before - len(_RECORDS)


def add_minimal_record(*, user_id: str, issue_summary_sanitized: str) -> tuple[MinimalRecord, int]:
    """
    Store a short sanitized summary (not the original user paste).

    Returns (record, number purged this call).
    """
    removed = purge_expired()
    rid = uuid.uuid4().hex[:12]
    rec = MinimalRecord(
        id=rid,
        user_id=user_id,
        issue_summary=issue_summary_sanitized.strip()[:240],
        created_at=_utcnow(),
    )
    _RECORDS.append(rec)
    return rec, removed


def store_stats() -> dict:
    purge_expired()
    return {
        "active_records": len(_RECORDS),
        "retention_days": _RETENTION_DAYS,
    }


def inject_stale_record_for_demo() -> dict:
    """
    Instructor hook: insert an artificially old row so the next `purge_expired`
    removes it — proves retention logic live.
    """
    old = _utcnow() - timedelta(days=40)
    sid = f"stale-{uuid.uuid4().hex[:8]}"
    stale = MinimalRecord(
        id=sid,
        user_id="lab",
        issue_summary="(injected row older than retention window)",
        created_at=old,
    )
    _RECORDS.append(stale)
    return {"injected_id": stale.id, "age_days": 40}
