"""Normalize MongoDB driver documents for Pydantic models (Phase 2+)."""

from __future__ import annotations

from typing import Any

from bson import ObjectId


def stringify_object_ids(value: Any) -> Any:
    """Recursively convert ObjectId values to str (for JSON-safe dicts)."""
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, dict):
        return {k: stringify_object_ids(v) for k, v in value.items()}
    if isinstance(value, list):
        return [stringify_object_ids(v) for v in value]
    return value


def id_dict(doc: dict[str, Any] | None) -> dict[str, Any] | None:
    """Return a shallow copy with ``_id`` as str when present."""
    if doc is None:
        return None
    out = dict(doc)
    if "_id" in out and isinstance(out["_id"], ObjectId):
        out["_id"] = str(out["_id"])
    return out
