"""
Request and response models for the Open AI Mastery learning API.

JSON field names use camelCase to align with the frontend contract.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


# --- Shared ---


class TopicUnlockRulesOut(BaseModel):
    require_view_before_mcq: bool = Field(True, alias="requireViewBeforeMcq")
    require_mcq_pass_before_subjective: bool = Field(
        True, alias="requireMcqPassBeforeSubjective"
    )
    mcq_pass_threshold: float = Field(1.0, alias="mcqPassThreshold")

    model_config = {"populate_by_name": True}


# --- Course ---


class CourseOut(BaseModel):
    id: str
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

    model_config = {"populate_by_name": True}


class CourseDetailOut(CourseOut):
    """Same as list for now; reserved for future nested stats."""

    pass


# --- Module ---


class ModuleSummaryOut(BaseModel):
    id: str
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

    model_config = {"populate_by_name": True}


# --- Topic ---


class TopicSummaryOut(BaseModel):
    id: str
    course_id: str = Field(alias="courseId")
    module_id: str = Field(alias="moduleId")
    title: str
    slug: str
    short_description: str = Field(alias="shortDescription")
    order: int
    estimated_minutes: int = Field(alias="estimatedMinutes")
    is_published: bool = Field(alias="isPublished")
    unlock_rules: TopicUnlockRulesOut = Field(alias="unlockRules")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True}


class TopicContentDemoOut(BaseModel):
    title: str
    problem: str
    solution_summary: str | None = Field(None, alias="solutionSummary")
    expected_output_example: dict[str, Any] | None = Field(
        None, alias="expectedOutputExample"
    )

    model_config = {"populate_by_name": True}


class TopicContentDeveloperManualOut(BaseModel):
    goal: str
    backend_flow: list[str] = Field(default_factory=list, alias="backendFlow")
    expected_output_example: dict[str, Any] | None = Field(
        None, alias="expectedOutputExample"
    )

    model_config = {"populate_by_name": True}


class TopicContentPracticeUseCaseOut(BaseModel):
    title: str
    problem: str
    practice_goal: str = Field(alias="practiceGoal")

    model_config = {"populate_by_name": True}


class TopicContentOut(BaseModel):
    id: str
    topic_id: str = Field(alias="topicId")
    high_level_concept: str = Field(alias="highLevelConcept")
    deep_concept: str = Field(alias="deepConcept")
    walkthrough: list[str] = Field(default_factory=list)
    demo: dict[str, Any] | TopicContentDemoOut
    developer_manual: dict[str, Any] | TopicContentDeveloperManualOut = Field(
        alias="developerManual"
    )
    practice_use_case: dict[str, Any] | TopicContentPracticeUseCaseOut = Field(
        alias="practiceUseCase"
    )
    key_takeaways: list[str] = Field(default_factory=list, alias="keyTakeaways")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True}


class TopicDetailOut(BaseModel):
    topic: TopicSummaryOut
    content: TopicContentOut | None = None

    model_config = {"populate_by_name": True}


# --- Assessment: MCQ ---


class MCQOut(BaseModel):
    id: str
    topic_id: str = Field(alias="topicId")
    question: str
    options: list[str]
    order: int

    model_config = {"populate_by_name": True}


class MCQSubmitItem(BaseModel):
    mcq_id: str = Field(alias="mcqId")
    selected_option: str = Field(alias="selectedOption")


class MCQSubmitRequest(BaseModel):
    answers: list[MCQSubmitItem]


class MCQSubmitResponse(BaseModel):
    score: float
    total: int
    is_passed: bool = Field(alias="isPassed")
    results: list[dict[str, Any]] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


# --- Assessment: Subjective ---


class SubjectiveQuestionOut(BaseModel):
    id: str
    topic_id: str = Field(alias="topicId")
    question: str
    order: int

    model_config = {"populate_by_name": True}


class SubjectiveAnswerItem(BaseModel):
    question_id: str = Field(alias="questionId")
    answer: str = Field(..., min_length=1)


class SubjectiveSubmitRequest(BaseModel):
    answers: list[SubjectiveAnswerItem]


class SubjectiveSubmitResponse(BaseModel):
    saved_count: int = Field(alias="savedCount")

    model_config = {"populate_by_name": True}


# --- Progress ---


class ModuleProgressEntryOut(BaseModel):
    viewed: bool = False
    completed: bool = False

    model_config = {"populate_by_name": True}


class TopicProgressEntryOut(BaseModel):
    viewed: bool = False
    viewed_at: datetime | None = Field(None, alias="viewedAt")
    mcq_completed: bool = Field(False, alias="mcqCompleted")
    mcq_passed: bool = Field(False, alias="mcqPassed")
    subjective_completed: bool = Field(False, alias="subjectiveCompleted")
    completed: bool = False

    model_config = {"populate_by_name": True}


class UserProgressOut(BaseModel):
    id: str
    user_id: str = Field(alias="userId")
    course_id: str = Field(alias="courseId")
    module_progress: dict[str, ModuleProgressEntryOut] = Field(
        default_factory=dict, alias="moduleProgress"
    )
    topic_progress: dict[str, TopicProgressEntryOut] = Field(
        default_factory=dict, alias="topicProgress"
    )
    updated_at: datetime = Field(alias="updatedAt")

    model_config = {"populate_by_name": True}


class TopicViewedRequest(BaseModel):
    course_id: str = Field(alias="courseId")
    module_id: str = Field(alias="moduleId")
    topic_id: str = Field(alias="topicId")


class TopicCompleteRequest(BaseModel):
    course_id: str = Field(alias="courseId")
    module_id: str = Field(alias="moduleId")
    topic_id: str = Field(alias="topicId")


class TopicProgressAck(BaseModel):
    ok: bool = True
    topic_id: str = Field(alias="topicId")

    model_config = {"populate_by_name": True}


class AssessmentGateOut(BaseModel):
    """Client hints; backend still enforces on submit."""

    topic_viewed: bool = Field(alias="topicViewed")
    mcq_unlocked: bool = Field(alias="mcqUnlocked")
    mcq_passed: bool = Field(alias="mcqPassed")
    subjective_unlocked: bool = Field(alias="subjectiveUnlocked")

    model_config = {"populate_by_name": True}
