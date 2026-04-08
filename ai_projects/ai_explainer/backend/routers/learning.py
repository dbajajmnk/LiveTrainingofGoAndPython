"""Learning API: courses, modules, topics, assessments, progress."""

from fastapi import APIRouter, Depends

from core.deps import get_current_user
from schemas.learning import (
    AssessmentGateOut,
    CourseOut,
    MCQOut,
    MCQSubmitRequest,
    MCQSubmitResponse,
    ModuleSummaryOut,
    SubjectiveQuestionOut,
    SubjectiveSubmitRequest,
    SubjectiveSubmitResponse,
    TopicCompleteRequest,
    TopicDetailOut,
    TopicProgressAck,
    TopicSummaryOut,
    TopicViewedRequest,
    UserProgressOut,
)
from services.learning_service import learning_service

router = APIRouter(prefix="/api", tags=["learning"])

_ALIAS = {"response_model_by_alias": True}


# --- Public catalog (published content only) ---


@router.get("/courses", response_model=list[CourseOut], **_ALIAS)
async def list_courses():
    return await learning_service.list_courses()


@router.get("/courses/{course_id}", response_model=CourseOut, **_ALIAS)
async def get_course(course_id: str):
    return await learning_service.get_course(course_id)


@router.get("/courses/{course_id}/modules", response_model=list[ModuleSummaryOut], **_ALIAS)
async def list_modules(course_id: str):
    return await learning_service.list_modules(course_id)


@router.get("/modules/{module_id}", response_model=ModuleSummaryOut, **_ALIAS)
async def get_module(module_id: str):
    return await learning_service.get_module(module_id)


@router.get("/modules/{module_id}/topics", response_model=list[TopicSummaryOut], **_ALIAS)
async def list_topics(module_id: str):
    return await learning_service.list_topics(module_id)


@router.get("/topics/{topic_id}", response_model=TopicDetailOut, **_ALIAS)
async def get_topic_detail(topic_id: str):
    return await learning_service.get_topic_detail(topic_id)


# --- Authenticated: gates, assessments, progress ---


@router.get("/topics/{topic_id}/assessment-gate", response_model=AssessmentGateOut, **_ALIAS)
async def get_topic_assessment_gate(
    topic_id: str,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.get_assessment_gate(current_user["id"], topic_id)


@router.get("/topics/{topic_id}/mcqs", response_model=list[MCQOut], **_ALIAS)
async def list_topic_mcqs(
    topic_id: str,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.list_mcqs_for_user(current_user["id"], topic_id)


@router.post("/topics/{topic_id}/mcq/submit", response_model=MCQSubmitResponse, **_ALIAS)
async def submit_topic_mcq(
    topic_id: str,
    body: MCQSubmitRequest,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.submit_mcq(current_user["id"], topic_id, body)


@router.get(
    "/topics/{topic_id}/subjectives",
    response_model=list[SubjectiveQuestionOut],
    **_ALIAS,
)
async def list_topic_subjectives(
    topic_id: str,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.list_subjectives_for_user(current_user["id"], topic_id)


@router.post(
    "/topics/{topic_id}/subjective/submit",
    response_model=SubjectiveSubmitResponse,
    **_ALIAS,
)
async def submit_topic_subjectives(
    topic_id: str,
    body: SubjectiveSubmitRequest,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.submit_subjectives(current_user["id"], topic_id, body)


@router.get("/users/me/progress/{course_id}", response_model=UserProgressOut, **_ALIAS)
async def get_my_course_progress(
    course_id: str,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.get_user_progress(current_user["id"], course_id)


@router.post("/users/me/progress/topic-viewed", response_model=TopicProgressAck, **_ALIAS)
async def post_topic_viewed(
    body: TopicViewedRequest,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.mark_topic_viewed(current_user["id"], body)


@router.post("/users/me/progress/topic-complete", response_model=TopicProgressAck, **_ALIAS)
async def post_topic_complete(
    body: TopicCompleteRequest,
    current_user: dict = Depends(get_current_user),
):
    return await learning_service.mark_topic_complete(current_user["id"], body)
