"""Business logic for courses, topics, assessments, and progress."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import HTTPException

from models.learning.documents import TopicProgressEntry
from repositories.learning_repository import LearningRepository
from schemas.learning import (
    AssessmentGateOut,
    CourseOut,
    MCQOut,
    MCQSubmitRequest,
    MCQSubmitResponse,
    ModuleProgressEntryOut,
    ModuleSummaryOut,
    SubjectiveQuestionOut,
    SubjectiveSubmitRequest,
    SubjectiveSubmitResponse,
    TopicCompleteRequest,
    TopicContentOut,
    TopicDetailOut,
    TopicProgressAck,
    TopicProgressEntryOut,
    TopicSummaryOut,
    TopicUnlockRulesOut,
    TopicViewedRequest,
    UserProgressOut,
)
from utils.objectid import str_to_oid


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _require_oid(resource_id: str, label: str) -> None:
    try:
        str_to_oid(resource_id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=f"{label} not found") from exc


class LearningService:
    def __init__(self, repo: LearningRepository | None = None):
        self.repo = repo or LearningRepository()

    # --- mappers ---

    def _course_out(self, doc: dict[str, Any]) -> CourseOut:
        return CourseOut(
            id=str(doc["_id"]),
            title=doc["title"],
            slug=doc["slug"],
            shortDescription=doc["shortDescription"],
            fullDescription=doc["fullDescription"],
            thumbnailUrl=doc.get("thumbnailUrl"),
            level=doc["level"],
            estimatedHours=doc["estimatedHours"],
            isPublished=doc["isPublished"],
            order=doc["order"],
            tags=doc.get("tags") or [],
            createdAt=doc["createdAt"],
            updatedAt=doc["updatedAt"],
        )

    def _module_out(self, doc: dict[str, Any]) -> ModuleSummaryOut:
        return ModuleSummaryOut(
            id=str(doc["_id"]),
            courseId=doc["courseId"],
            title=doc["title"],
            slug=doc["slug"],
            shortDescription=doc["shortDescription"],
            fullDescription=doc["fullDescription"],
            order=doc["order"],
            estimatedHours=doc["estimatedHours"],
            topicCount=doc["topicCount"],
            isPublished=doc["isPublished"],
            createdAt=doc["createdAt"],
            updatedAt=doc["updatedAt"],
        )

    def _topic_out(self, doc: dict[str, Any]) -> TopicSummaryOut:
        ur = doc.get("unlockRules") or {}
        rules = TopicUnlockRulesOut(
            requireViewBeforeMcq=ur.get("requireViewBeforeMcq", True),
            requireMcqPassBeforeSubjective=ur.get(
                "requireMcqPassBeforeSubjective", True
            ),
            mcqPassThreshold=ur.get("mcqPassThreshold", 1.0),
        )
        return TopicSummaryOut(
            id=str(doc["_id"]),
            courseId=doc["courseId"],
            moduleId=doc["moduleId"],
            title=doc["title"],
            slug=doc["slug"],
            shortDescription=doc["shortDescription"],
            order=doc["order"],
            estimatedMinutes=doc["estimatedMinutes"],
            isPublished=doc["isPublished"],
            unlockRules=rules,
            createdAt=doc["createdAt"],
            updatedAt=doc["updatedAt"],
        )

    def _topic_content_out(self, doc: dict[str, Any]) -> TopicContentOut:
        return TopicContentOut(
            id=str(doc["_id"]),
            topicId=doc["topicId"],
            highLevelConcept=doc["highLevelConcept"],
            deepConcept=doc["deepConcept"],
            walkthrough=doc.get("walkthrough") or [],
            demo=doc["demo"],
            developerManual=doc["developerManual"],
            practiceUseCase=doc["practiceUseCase"],
            keyTakeaways=doc.get("keyTakeaways") or [],
            createdAt=doc["createdAt"],
            updatedAt=doc["updatedAt"],
        )

    def _mcq_public(self, doc: dict[str, Any]) -> MCQOut:
        return MCQOut(
            id=str(doc["_id"]),
            topicId=doc["topicId"],
            question=doc["question"],
            options=doc["options"],
            order=doc["order"],
        )

    def _subjective_public(self, doc: dict[str, Any]) -> SubjectiveQuestionOut:
        return SubjectiveQuestionOut(
            id=str(doc["_id"]),
            topicId=doc["topicId"],
            question=doc["question"],
            order=doc["order"],
        )

    def _parse_topic_progress(
        self, raw: dict[str, Any] | None
    ) -> dict[str, TopicProgressEntry]:
        if not raw:
            return {}
        out: dict[str, TopicProgressEntry] = {}
        for tid, entry in raw.items():
            if not isinstance(entry, dict):
                continue
            out[tid] = TopicProgressEntry.model_validate(
                {
                    "viewed": entry.get("viewed", False),
                    "viewedAt": entry.get("viewedAt"),
                    "mcqCompleted": entry.get("mcqCompleted", False),
                    "mcqPassed": entry.get("mcqPassed", False),
                    "subjectiveCompleted": entry.get("subjectiveCompleted", False),
                    "completed": entry.get("completed", False),
                }
            )
        return out

    def _parse_module_progress(
        self, raw: dict[str, Any] | None
    ) -> dict[str, dict[str, bool]]:
        if not raw:
            return {}
        out: dict[str, dict[str, bool]] = {}
        for mid, entry in raw.items():
            if isinstance(entry, dict):
                out[mid] = {
                    "viewed": bool(entry.get("viewed", False)),
                    "completed": bool(entry.get("completed", False)),
                }
        return out

    def _user_progress_out(self, doc: dict[str, Any]) -> UserProgressOut:
        mp_raw = doc.get("moduleProgress") or {}
        tp_raw = doc.get("topicProgress") or {}

        module_out: dict[str, ModuleProgressEntryOut] = {}
        for mid, v in mp_raw.items():
            if isinstance(v, dict):
                module_out[mid] = ModuleProgressEntryOut(
                    viewed=bool(v.get("viewed", False)),
                    completed=bool(v.get("completed", False)),
                )
        topic_out: dict[str, TopicProgressEntryOut] = {}
        for tid, v in tp_raw.items():
            if isinstance(v, dict):
                topic_out[tid] = TopicProgressEntryOut(
                    viewed=bool(v.get("viewed", False)),
                    viewedAt=v.get("viewedAt"),
                    mcqCompleted=bool(v.get("mcqCompleted", False)),
                    mcqPassed=bool(v.get("mcqPassed", False)),
                    subjectiveCompleted=bool(v.get("subjectiveCompleted", False)),
                    completed=bool(v.get("completed", False)),
                )
        return UserProgressOut(
            id=str(doc["_id"]),
            userId=doc["userId"],
            courseId=doc["courseId"],
            moduleProgress=module_out,
            topicProgress=topic_out,
            updatedAt=doc["updatedAt"],
        )

    def _get_unlock_rules(self, topic_doc: dict[str, Any]) -> dict[str, Any]:
        return topic_doc.get("unlockRules") or {}

    def _topic_gate(
        self, topic_doc: dict[str, Any], progress: dict[str, TopicProgressEntry]
    ) -> AssessmentGateOut:
        tid = str(topic_doc["_id"])
        tp = progress.get(tid)
        ur = self._get_unlock_rules(topic_doc)
        require_view = ur.get("requireViewBeforeMcq", True)
        require_mcq_for_sub = ur.get("requireMcqPassBeforeSubjective", True)

        viewed = bool(tp and tp.viewed)
        mcq_passed = bool(tp and tp.mcq_passed)
        mcq_unlocked = (not require_view) or viewed
        subjective_unlocked = (not require_mcq_for_sub) or mcq_passed

        return AssessmentGateOut(
            topicViewed=viewed,
            mcqUnlocked=mcq_unlocked,
            mcqPassed=mcq_passed,
            subjectiveUnlocked=subjective_unlocked,
        )

    # --- reads ---

    async def list_courses(self) -> list[CourseOut]:
        docs = await self.repo.list_courses(published_only=True)
        return [self._course_out(d) for d in docs]

    async def get_course(self, course_id: str) -> CourseOut:
        _require_oid(course_id, "Course")
        doc = await self.repo.get_course(course_id)
        if not doc or not doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Course not found")
        return self._course_out(doc)

    async def list_modules(self, course_id: str) -> list[ModuleSummaryOut]:
        await self.get_course(course_id)
        docs = await self.repo.list_modules(course_id)
        return [self._module_out(d) for d in docs if d.get("isPublished")]

    async def get_module(self, module_id: str) -> ModuleSummaryOut:
        _require_oid(module_id, "Module")
        doc = await self.repo.get_module(module_id)
        if not doc or not doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Module not found")
        return self._module_out(doc)

    async def list_topics(self, module_id: str) -> list[TopicSummaryOut]:
        mod = await self.get_module(module_id)
        docs = await self.repo.list_topics(module_id)
        return [self._topic_out(d) for d in docs if d.get("isPublished")]

    async def get_topic_detail(self, topic_id: str) -> TopicDetailOut:
        _require_oid(topic_id, "Topic")
        doc = await self.repo.get_topic(topic_id)
        if not doc or not doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Topic not found")
        content_doc = await self.repo.get_topic_content(topic_id)
        content = self._topic_content_out(content_doc) if content_doc else None
        return TopicDetailOut(topic=self._topic_out(doc), content=content)

    async def get_assessment_gate(
        self, user_id: str, topic_id: str
    ) -> AssessmentGateOut:
        topic_doc = await self.repo.get_topic(topic_id)
        if not topic_doc:
            raise HTTPException(status_code=404, detail="Topic not found")
        course_id = topic_doc["courseId"]
        progress_doc = await self.repo.get_user_progress(user_id, course_id)
        tp_raw = (progress_doc or {}).get("topicProgress") or {}
        progress = self._parse_topic_progress(tp_raw)
        return self._topic_gate(topic_doc, progress)

    async def list_mcqs_for_user(self, user_id: str, topic_id: str) -> list[MCQOut]:
        _require_oid(topic_id, "Topic")
        topic_doc = await self.repo.get_topic(topic_id)
        if not topic_doc or not topic_doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Topic not found")
        progress_doc = await self.repo.get_user_progress(user_id, topic_doc["courseId"])
        tp_raw = (progress_doc or {}).get("topicProgress") or {}
        progress = self._parse_topic_progress(tp_raw)
        gate = self._topic_gate(topic_doc, progress)
        if not gate.mcq_unlocked:
            raise HTTPException(
                status_code=403,
                detail="MCQs unlock after the topic is marked viewed.",
            )
        docs = await self.repo.list_mcqs_for_topic(topic_id)
        return [self._mcq_public(d) for d in docs]

    async def list_subjectives_for_user(
        self, user_id: str, topic_id: str
    ) -> list[SubjectiveQuestionOut]:
        _require_oid(topic_id, "Topic")
        topic_doc = await self.repo.get_topic(topic_id)
        if not topic_doc or not topic_doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Topic not found")
        progress_doc = await self.repo.get_user_progress(user_id, topic_doc["courseId"])
        tp_raw = (progress_doc or {}).get("topicProgress") or {}
        progress = self._parse_topic_progress(tp_raw)
        gate = self._topic_gate(topic_doc, progress)
        if not gate.subjective_unlocked:
            raise HTTPException(
                status_code=403,
                detail="Subjective questions unlock after MCQ is passed.",
            )
        docs = await self.repo.list_subjective_questions(topic_id)
        return [self._subjective_public(d) for d in docs]

    async def get_user_progress(self, user_id: str, course_id: str) -> UserProgressOut:
        _require_oid(course_id, "Course")
        await self.get_course(course_id)
        doc = await self.repo.get_user_progress(user_id, course_id)
        if not doc:
            await self.repo.replace_user_progress_fields(user_id, course_id, {}, {})
            doc = await self.repo.get_user_progress(user_id, course_id)
        if not doc:
            raise HTTPException(status_code=500, detail="Could not initialize progress")
        return self._user_progress_out(doc)

    async def mark_topic_viewed(
        self, user_id: str, body: TopicViewedRequest
    ) -> TopicProgressAck:
        _require_oid(body.course_id, "Course")
        _require_oid(body.module_id, "Module")
        _require_oid(body.topic_id, "Topic")
        course = await self.repo.get_course(body.course_id)
        if not course or not course.get("isPublished"):
            raise HTTPException(status_code=404, detail="Course not found")
        module = await self.repo.get_module(body.module_id)
        if not module or module.get("courseId") != body.course_id:
            raise HTTPException(status_code=404, detail="Module not found")
        topic = await self.repo.get_topic(body.topic_id)
        if (
            not topic
            or topic.get("courseId") != body.course_id
            or topic.get("moduleId") != body.module_id
        ):
            raise HTTPException(status_code=404, detail="Topic not found")

        progress_doc = await self.repo.get_user_progress(user_id, body.course_id)
        mp = self._parse_module_progress(
            (progress_doc or {}).get("moduleProgress")
        )
        tp = self._parse_topic_progress((progress_doc or {}).get("topicProgress"))

        mid = body.module_id
        tid = body.topic_id
        prev = tp.get(tid) or TopicProgressEntry()
        tp[tid] = TopicProgressEntry(
            viewed=True,
            viewedAt=_now(),
            mcqCompleted=prev.mcq_completed,
            mcqPassed=prev.mcq_passed,
            subjectiveCompleted=prev.subjective_completed,
            completed=prev.completed,
        )
        cur_mod = mp.get(mid) or {"viewed": False, "completed": False}
        mp[mid] = {**cur_mod, "viewed": True}

        mp_payload = {k: {"viewed": v["viewed"], "completed": v["completed"]} for k, v in mp.items()}
        tp_payload = {
            k: {
                "viewed": v.viewed,
                "viewedAt": v.viewed_at,
                "mcqCompleted": v.mcq_completed,
                "mcqPassed": v.mcq_passed,
                "subjectiveCompleted": v.subjective_completed,
                "completed": v.completed,
            }
            for k, v in tp.items()
        }

        await self.repo.replace_user_progress_fields(
            user_id, body.course_id, mp_payload, tp_payload
        )
        return TopicProgressAck(ok=True, topicId=tid)

    async def mark_topic_complete(
        self, user_id: str, body: TopicCompleteRequest
    ) -> TopicProgressAck:
        _require_oid(body.course_id, "Course")
        _require_oid(body.module_id, "Module")
        _require_oid(body.topic_id, "Topic")
        course = await self.repo.get_course(body.course_id)
        if not course or not course.get("isPublished"):
            raise HTTPException(status_code=404, detail="Course not found")
        topic = await self.repo.get_topic(body.topic_id)
        if (
            not topic
            or topic.get("courseId") != body.course_id
            or topic.get("moduleId") != body.module_id
        ):
            raise HTTPException(status_code=404, detail="Topic not found")

        progress_doc = await self.repo.get_user_progress(user_id, body.course_id)
        mp = self._parse_module_progress(
            (progress_doc or {}).get("moduleProgress")
        )
        tp = self._parse_topic_progress((progress_doc or {}).get("topicProgress"))

        tid = body.topic_id
        mid = body.module_id
        prev = tp.get(tid) or TopicProgressEntry()
        tp[tid] = TopicProgressEntry(
            viewed=prev.viewed or True,
            viewedAt=prev.viewed_at,
            mcqCompleted=prev.mcq_completed,
            mcqPassed=prev.mcq_passed,
            subjectiveCompleted=prev.subjective_completed,
            completed=True,
        )
        cur_mod = mp.get(mid) or {"viewed": False, "completed": False}
        mp[mid] = {**cur_mod, "viewed": True}

        mp_payload = {k: {"viewed": v["viewed"], "completed": v["completed"]} for k, v in mp.items()}
        tp_payload = {
            k: {
                "viewed": v.viewed,
                "viewedAt": v.viewed_at,
                "mcqCompleted": v.mcq_completed,
                "mcqPassed": v.mcq_passed,
                "subjectiveCompleted": v.subjective_completed,
                "completed": v.completed,
            }
            for k, v in tp.items()
        }

        await self.repo.replace_user_progress_fields(
            user_id, body.course_id, mp_payload, tp_payload
        )
        return TopicProgressAck(ok=True, topicId=tid)

    async def submit_mcq(
        self, user_id: str, topic_id: str, body: MCQSubmitRequest
    ) -> MCQSubmitResponse:
        _require_oid(topic_id, "Topic")
        topic_doc = await self.repo.get_topic(topic_id)
        if not topic_doc or not topic_doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Topic not found")

        progress_doc = await self.repo.get_user_progress(user_id, topic_doc["courseId"])
        tp_raw = (progress_doc or {}).get("topicProgress") or {}
        progress = self._parse_topic_progress(tp_raw)
        gate = self._topic_gate(topic_doc, progress)
        if not gate.mcq_unlocked:
            raise HTTPException(
                status_code=403,
                detail="MCQs unlock after the topic is marked viewed.",
            )

        mcqs = await self.repo.list_mcqs_for_topic(topic_id)
        if not mcqs:
            raise HTTPException(status_code=400, detail="No MCQs configured for this topic.")

        by_id = {str(d["_id"]): d for d in mcqs}
        answer_map = {a.mcq_id: a.selected_option for a in body.answers}

        correct_count = 0
        results: list[dict[str, Any]] = []
        total = len(mcqs)
        ur = self._get_unlock_rules(topic_doc)
        threshold = float(ur.get("mcqPassThreshold", 1.0))

        for m in mcqs:
            mid = str(m["_id"])
            sel = (answer_map.get(mid) or "").strip()
            correct = (m.get("correctAnswer") or "").strip()
            ok = bool(sel) and sel == correct
            if ok:
                correct_count += 1
            results.append(
                {
                    "mcqId": mid,
                    "correct": ok,
                    "explanation": m.get("explanation", ""),
                }
            )

        score = correct_count / total if total else 0.0
        is_passed = score >= threshold - 1e-9

        mp = self._parse_module_progress(
            (progress_doc or {}).get("moduleProgress")
        )
        tp = self._parse_topic_progress(tp_raw)
        prev = tp.get(topic_id) or TopicProgressEntry()
        tp[topic_id] = TopicProgressEntry(
            viewed=prev.viewed,
            viewedAt=prev.viewed_at,
            mcqCompleted=True,
            mcqPassed=is_passed,
            subjectiveCompleted=prev.subjective_completed,
            completed=prev.completed,
        )

        mid_mod = topic_doc["moduleId"]
        cur_mod = mp.get(mid_mod) or {"viewed": False, "completed": False}
        mp[mid_mod] = {**cur_mod, "viewed": True}

        mp_payload = {k: {"viewed": v["viewed"], "completed": v["completed"]} for k, v in mp.items()}
        tp_payload = {
            k: {
                "viewed": v.viewed,
                "viewedAt": v.viewed_at,
                "mcqCompleted": v.mcq_completed,
                "mcqPassed": v.mcq_passed,
                "subjectiveCompleted": v.subjective_completed,
                "completed": v.completed,
            }
            for k, v in tp.items()
        }

        await self.repo.replace_user_progress_fields(
            user_id, topic_doc["courseId"], mp_payload, tp_payload
        )

        await self.repo.insert_mcq_attempt(
            {
                "userId": user_id,
                "topicId": topic_id,
                "selectedAnswers": {k: answer_map.get(k, "") for k in by_id},
                "score": score,
                "isPassed": is_passed,
                "createdAt": _now(),
            }
        )

        return MCQSubmitResponse(
            score=score,
            total=total,
            isPassed=is_passed,
            results=results,
        )

    async def submit_subjectives(
        self, user_id: str, topic_id: str, body: SubjectiveSubmitRequest
    ) -> SubjectiveSubmitResponse:
        _require_oid(topic_id, "Topic")
        topic_doc = await self.repo.get_topic(topic_id)
        if not topic_doc or not topic_doc.get("isPublished"):
            raise HTTPException(status_code=404, detail="Topic not found")

        progress_doc = await self.repo.get_user_progress(user_id, topic_doc["courseId"])
        tp_raw = (progress_doc or {}).get("topicProgress") or {}
        progress = self._parse_topic_progress(tp_raw)
        gate = self._topic_gate(topic_doc, progress)
        if not gate.subjective_unlocked:
            raise HTTPException(
                status_code=403,
                detail="Subjective answers require a passing MCQ score.",
            )

        questions = await self.repo.list_subjective_questions(topic_id)
        allowed = {str(q["_id"]) for q in questions}
        for item in body.answers:
            if item.question_id not in allowed:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid question id for this topic: {item.question_id}",
                )

        await self.repo.delete_subjective_answers_for_topic(user_id, topic_id)
        now = _now()
        rows = [
            {
                "userId": user_id,
                "topicId": topic_id,
                "questionId": item.question_id,
                "answer": item.answer,
                "createdAt": now,
            }
            for item in body.answers
        ]
        saved = await self.repo.insert_subjective_answers(rows)

        mp = self._parse_module_progress(
            (progress_doc or {}).get("moduleProgress")
        )
        tp = self._parse_topic_progress(tp_raw)
        prev = tp.get(topic_id) or TopicProgressEntry()
        tp[topic_id] = TopicProgressEntry(
            viewed=prev.viewed,
            viewedAt=prev.viewed_at,
            mcqCompleted=prev.mcq_completed,
            mcqPassed=prev.mcq_passed,
            subjectiveCompleted=True,
            completed=prev.completed,
        )
        mid_mod = topic_doc["moduleId"]
        cur_mod = mp.get(mid_mod) or {"viewed": False, "completed": False}
        mp[mid_mod] = {**cur_mod, "viewed": True}

        mp_payload = {k: {"viewed": v["viewed"], "completed": v["completed"]} for k, v in mp.items()}
        tp_payload = {
            k: {
                "viewed": v.viewed,
                "viewedAt": v.viewed_at,
                "mcqCompleted": v.mcq_completed,
                "mcqPassed": v.mcq_passed,
                "subjectiveCompleted": v.subjective_completed,
                "completed": v.completed,
            }
            for k, v in tp.items()
        }

        await self.repo.replace_user_progress_fields(
            user_id, topic_doc["courseId"], mp_payload, tp_payload
        )

        return SubjectiveSubmitResponse(savedCount=saved)


learning_service = LearningService()
