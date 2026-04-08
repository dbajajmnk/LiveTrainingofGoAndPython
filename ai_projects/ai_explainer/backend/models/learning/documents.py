"""
MongoDB document shapes for the learning domain.

These models describe fields stored in MongoDB. Repositories normalize
``_id`` between ``bson.ObjectId`` and ``str`` when reading/writing.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class CourseDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    title: str
    slug: str
    short_description: str = Field(alias="shortDescription")
    full_description: str = Field(alias="fullDescription")
    thumbnail_url: str | None = Field(None, alias="thumbnailUrl")
    level: str
    estimated_hours: float = Field(alias="estimatedHours")
    is_published: bool = Field(alias="isPublished")
    order: int
    tags: list[str] = Field(default_factory=list)
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class ModuleDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    course_id: str = Field(alias="courseId")
    title: str
    slug: str
    short_description: str = Field(alias="shortDescription")
    full_description: str = Field(alias="fullDescription")
    order: int
    estimated_hours: float = Field(alias="estimatedHours")
    topic_count: int = Field(alias="topicCount")
    is_published: bool = Field(alias="isPublished")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicUnlockRules(BaseModel):
    """Backend-evaluated rules; extend as needed."""

    require_view_before_mcq: bool = Field(True, alias="requireViewBeforeMcq")
    require_mcq_pass_before_subjective: bool = Field(
        True, alias="requireMcqPassBeforeSubjective"
    )
    mcq_pass_threshold: float = Field(1.0, alias="mcqPassThreshold")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    course_id: str = Field(alias="courseId")
    module_id: str = Field(alias="moduleId")
    title: str
    slug: str
    short_description: str = Field(alias="shortDescription")
    order: int
    estimated_minutes: int = Field(alias="estimatedMinutes")
    is_published: bool = Field(alias="isPublished")
    unlock_rules: TopicUnlockRules = Field(
        default_factory=TopicUnlockRules, alias="unlockRules"
    )
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicContentDemo(BaseModel):
    title: str
    problem: str
    solution_summary: str | None = Field(None, alias="solutionSummary")
    expected_output_example: dict[str, Any] | None = Field(
        None, alias="expectedOutputExample"
    )

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicContentDeveloperManual(BaseModel):
    goal: str
    backend_flow: list[str] = Field(default_factory=list, alias="backendFlow")
    expected_output_example: dict[str, Any] | None = Field(
        None, alias="expectedOutputExample"
    )

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicContentPracticeUseCase(BaseModel):
    title: str
    problem: str
    practice_goal: str = Field(alias="practiceGoal")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class TopicContentDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    topic_id: str = Field(alias="topicId")
    high_level_concept: str = Field(alias="highLevelConcept")
    deep_concept: str = Field(alias="deepConcept")
    walkthrough: list[str] = Field(default_factory=list)
    demo: TopicContentDemo | dict[str, Any]
    developer_manual: TopicContentDeveloperManual | dict[str, Any] = Field(
        alias="developerManual"
    )
    practice_use_case: TopicContentPracticeUseCase | dict[str, Any] = Field(
        alias="practiceUseCase"
    )
    key_takeaways: list[str] = Field(default_factory=list, alias="keyTakeaways")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class MCQDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    topic_id: str = Field(alias="topicId")
    question: str
    options: list[str]
    correct_answer: str = Field(alias="correctAnswer")
    explanation: str
    order: int

    model_config = {"populate_by_name": True, "extra": "ignore"}


class SubjectiveQuestionDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    topic_id: str = Field(alias="topicId")
    question: str
    sample_answer: str | None = Field(None, alias="sampleAnswer")
    order: int

    model_config = {"populate_by_name": True, "extra": "ignore"}


class ModuleProgressEntry(BaseModel):
    viewed: bool = False
    completed: bool = False


class TopicProgressEntry(BaseModel):
    viewed: bool = False
    viewed_at: datetime | None = Field(None, alias="viewedAt")
    mcq_completed: bool = Field(False, alias="mcqCompleted")
    mcq_passed: bool = Field(False, alias="mcqPassed")
    subjective_completed: bool = Field(False, alias="subjectiveCompleted")
    completed: bool = False

    model_config = {"populate_by_name": True, "extra": "ignore"}


class UserProgressDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    user_id: str = Field(alias="userId")
    course_id: str = Field(alias="courseId")
    module_progress: dict[str, ModuleProgressEntry] = Field(
        default_factory=dict, alias="moduleProgress"
    )
    topic_progress: dict[str, TopicProgressEntry] = Field(
        default_factory=dict, alias="topicProgress"
    )
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class MCQAttemptDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    user_id: str = Field(alias="userId")
    topic_id: str = Field(alias="topicId")
    selected_answers: dict[str, str] = Field(
        default_factory=dict, alias="selectedAnswers"
    )
    score: float
    is_passed: bool = Field(alias="isPassed")
    created_at: datetime = Field(alias="createdAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class SubjectiveAnswerDocument(BaseModel):
    id: str | None = Field(None, alias="_id")
    user_id: str = Field(alias="userId")
    topic_id: str = Field(alias="topicId")
    question_id: str = Field(alias="questionId")
    answer: str
    created_at: datetime = Field(alias="createdAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}
