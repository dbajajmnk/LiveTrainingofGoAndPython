"""Learning domain: MongoDB collection names and document shapes."""

from .collections import LearningCollections
from .documents import (
    CourseDocument,
    MCQAttemptDocument,
    MCQDocument,
    ModuleDocument,
    SubjectiveAnswerDocument,
    SubjectiveQuestionDocument,
    TopicContentDocument,
    TopicDocument,
    UserProgressDocument,
)

__all__ = [
    "LearningCollections",
    "CourseDocument",
    "ModuleDocument",
    "TopicDocument",
    "TopicContentDocument",
    "MCQDocument",
    "SubjectiveQuestionDocument",
    "UserProgressDocument",
    "MCQAttemptDocument",
    "SubjectiveAnswerDocument",
]
