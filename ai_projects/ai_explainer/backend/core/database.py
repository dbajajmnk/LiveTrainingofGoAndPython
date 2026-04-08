from motor.motor_asyncio import AsyncIOMotorClient

from core.config import settings
from models.learning.collections import LearningCollections

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]


def get_users_collection():
    return db["users"]


def get_courses_collection():
    return db[LearningCollections.COURSES]


def get_modules_collection():
    return db[LearningCollections.MODULES]


def get_topics_collection():
    return db[LearningCollections.TOPICS]


def get_topic_contents_collection():
    return db[LearningCollections.TOPIC_CONTENTS]


def get_mcqs_collection():
    return db[LearningCollections.MCQS]


def get_subjective_questions_collection():
    return db[LearningCollections.SUBJECTIVE_QUESTIONS]


def get_user_progress_collection():
    return db[LearningCollections.USER_PROGRESS]


def get_mcq_attempts_collection():
    return db[LearningCollections.MCQ_ATTEMPTS]


def get_subjective_answers_collection():
    return db[LearningCollections.SUBJECTIVE_ANSWERS]
