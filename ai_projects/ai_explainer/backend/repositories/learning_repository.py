"""MongoDB access for learning domain."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from bson import ObjectId

from core.database import (
    get_courses_collection,
    get_mcq_attempts_collection,
    get_mcqs_collection,
    get_modules_collection,
    get_subjective_answers_collection,
    get_subjective_questions_collection,
    get_topic_contents_collection,
    get_topics_collection,
    get_user_progress_collection,
)


def _id_filter(value: str) -> dict[str, Any] | None:
    """Return ``{\"_id\": ObjectId}`` or None if ``value`` is not a valid id."""
    if not ObjectId.is_valid(value):
        return None
    return {"_id": ObjectId(value)}


def _with_str_id(doc: dict[str, Any] | None) -> dict[str, Any] | None:
    if doc is None:
        return None
    out = dict(doc)
    if "_id" in out and isinstance(out["_id"], ObjectId):
        out["_id"] = str(out["_id"])
    return out


class LearningRepository:
    async def list_courses(self, *, published_only: bool = True) -> list[dict[str, Any]]:
        col = get_courses_collection()
        q: dict[str, Any] = {}
        if published_only:
            q["isPublished"] = True
        cursor = col.find(q).sort("order", 1)
        return [_with_str_id(d) async for d in cursor if d]

    async def get_course(self, course_id: str) -> dict[str, Any] | None:
        flt = _id_filter(course_id)
        if not flt:
            return None
        col = get_courses_collection()
        doc = await col.find_one(flt)
        return _with_str_id(doc)

    async def list_modules(self, course_id: str) -> list[dict[str, Any]]:
        col = get_modules_collection()
        cursor = col.find({"courseId": course_id}).sort("order", 1)
        return [_with_str_id(d) async for d in cursor if d]

    async def get_module(self, module_id: str) -> dict[str, Any] | None:
        flt = _id_filter(module_id)
        if not flt:
            return None
        col = get_modules_collection()
        doc = await col.find_one(flt)
        return _with_str_id(doc)

    async def list_topics(self, module_id: str) -> list[dict[str, Any]]:
        col = get_topics_collection()
        cursor = col.find({"moduleId": module_id}).sort("order", 1)
        return [_with_str_id(d) async for d in cursor if d]

    async def get_topic(self, topic_id: str) -> dict[str, Any] | None:
        flt = _id_filter(topic_id)
        if not flt:
            return None
        col = get_topics_collection()
        doc = await col.find_one(flt)
        return _with_str_id(doc)

    async def get_topic_content(self, topic_id: str) -> dict[str, Any] | None:
        col = get_topic_contents_collection()
        doc = await col.find_one({"topicId": topic_id})
        return _with_str_id(doc)

    async def list_mcqs_for_topic(self, topic_id: str) -> list[dict[str, Any]]:
        col = get_mcqs_collection()
        cursor = col.find({"topicId": topic_id}).sort("order", 1)
        return [_with_str_id(d) async for d in cursor if d]

    async def list_subjective_questions(self, topic_id: str) -> list[dict[str, Any]]:
        col = get_subjective_questions_collection()
        cursor = col.find({"topicId": topic_id}).sort("order", 1)
        return [_with_str_id(d) async for d in cursor if d]

    async def get_user_progress(self, user_id: str, course_id: str) -> dict[str, Any] | None:
        col = get_user_progress_collection()
        doc = await col.find_one({"userId": user_id, "courseId": course_id})
        return _with_str_id(doc)

    async def replace_user_progress_fields(
        self,
        user_id: str,
        course_id: str,
        module_progress: dict[str, Any],
        topic_progress: dict[str, Any],
    ) -> dict[str, Any]:
        col = get_user_progress_collection()
        now = datetime.now(timezone.utc)
        await col.update_one(
            {"userId": user_id, "courseId": course_id},
            {
                "$set": {
                    "moduleProgress": module_progress,
                    "topicProgress": topic_progress,
                    "updatedAt": now,
                },
                "$setOnInsert": {"userId": user_id, "courseId": course_id},
            },
            upsert=True,
        )
        doc = await col.find_one({"userId": user_id, "courseId": course_id})
        return _with_str_id(doc) or {}

    async def insert_mcq_attempt(self, payload: dict[str, Any]) -> dict[str, Any]:
        col = get_mcq_attempts_collection()
        payload.setdefault("createdAt", datetime.now(timezone.utc))
        res = await col.insert_one(payload)
        doc = await col.find_one({"_id": res.inserted_id})
        return _with_str_id(doc) or {}

    async def delete_subjective_answers_for_topic(self, user_id: str, topic_id: str) -> None:
        col = get_subjective_answers_collection()
        await col.delete_many({"userId": user_id, "topicId": topic_id})

    async def insert_subjective_answers(
        self, rows: list[dict[str, Any]]
    ) -> int:
        if not rows:
            return 0
        col = get_subjective_answers_collection()
        await col.insert_many(rows)
        return len(rows)
