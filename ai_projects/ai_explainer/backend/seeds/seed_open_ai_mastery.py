"""
Seed data for the first usable learning flow:

- 1 course: "Open AI Mastery"
- 14 modules
- Module 1: 10 topics
- Topic 1: full TopicContent + MCQs + subjective questions

Uses deterministic ObjectIds so relations stay consistent across runs.
The seed is idempotent: it upserts by fixed ``_id`` values.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from bson import ObjectId

from core.database import (
    get_courses_collection,
    get_mcqs_collection,
    get_modules_collection,
    get_subjective_questions_collection,
    get_topic_contents_collection,
    get_topics_collection,
)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _oid(hex24: str) -> ObjectId:
    return ObjectId(hex24)


@dataclass(frozen=True)
class SeedIds:
    course_open_ai_mastery: ObjectId = _oid("00000000000000000000a001")

    # Modules (14)
    m01_intro: ObjectId = _oid("00000000000000000000b001")
    m02_api_fundamentals: ObjectId = _oid("00000000000000000000b002")
    m03_prompt_foundations: ObjectId = _oid("00000000000000000000b003")
    m04_structured_outputs: ObjectId = _oid("00000000000000000000b004")
    m05_openai_fastapi: ObjectId = _oid("00000000000000000000b005")
    m06_openai_react: ObjectId = _oid("00000000000000000000b006")
    m07_embeddings: ObjectId = _oid("00000000000000000000b007")
    m08_rag: ObjectId = _oid("00000000000000000000b008")
    m09_function_calling: ObjectId = _oid("00000000000000000000b009")
    m10_agents: ObjectId = _oid("00000000000000000000b00a")
    m11_safety: ObjectId = _oid("00000000000000000000b00b")
    m12_cost_perf: ObjectId = _oid("00000000000000000000b00c")
    m13_testing_eval: ObjectId = _oid("00000000000000000000b00d")
    m14_end_to_end: ObjectId = _oid("00000000000000000000b00e")

    # Module 1 topics (10)
    t01_what_is_openai: ObjectId = _oid("00000000000000000000c001")
    t02_ai_vs_ml_vs_llm: ObjectId = _oid("00000000000000000000c002")
    t03_problems_openai_solves: ObjectId = _oid("00000000000000000000c003")
    t04_platform_overview: ObjectId = _oid("00000000000000000000c004")
    t05_models_overview: ObjectId = _oid("00000000000000000000c005")
    t06_tokens_context: ObjectId = _oid("00000000000000000000c006")
    t07_temperature_top_p: ObjectId = _oid("00000000000000000000c007")
    t08_api_first_thinking: ObjectId = _oid("00000000000000000000c008")
    t09_common_use_cases: ObjectId = _oid("00000000000000000000c009")
    t10_limitations: ObjectId = _oid("00000000000000000000c00a")

    # Topic 1 content doc
    tc_t01: ObjectId = _oid("00000000000000000000d001")

    # Topic 1 MCQs
    mcq1: ObjectId = _oid("00000000000000000000e001")
    mcq2: ObjectId = _oid("00000000000000000000e002")
    mcq3: ObjectId = _oid("00000000000000000000e003")

    # Topic 1 Subjectives
    sq1: ObjectId = _oid("00000000000000000000f001")
    sq2: ObjectId = _oid("00000000000000000000f002")
    sq3: ObjectId = _oid("00000000000000000000f003")


IDS = SeedIds()


def _course_doc(*, now: datetime) -> dict[str, Any]:
    return {
        "_id": IDS.course_open_ai_mastery,
        "title": "Open AI Mastery",
        "slug": "open-ai-mastery",
        "shortDescription": "A practical, step-by-step course to understand the OpenAI platform and build real features with it.",
        "fullDescription": (
            "Open AI Mastery is a developer-first course designed to help you learn the OpenAI platform "
            "in a structured and practical way. You will understand key concepts (models, tokens, prompt engineering, "
            "structured outputs), and learn how to build real AI features in a modern web app architecture "
            "using FastAPI, React, MongoDB, and the OpenAI API."
        ),
        "thumbnailUrl": None,
        "level": "Beginner to Intermediate",
        "estimatedHours": 10.0,
        "isPublished": True,
        "order": 1,
        "tags": ["openai", "api", "prompt-engineering", "fastapi", "react", "mongodb"],
        "createdAt": now,
        "updatedAt": now,
    }


def _module_docs(*, now: datetime) -> list[dict[str, Any]]:
    course_id = str(IDS.course_open_ai_mastery)
    modules: list[dict[str, Any]] = [
        {
            "_id": IDS.m01_intro,
            "courseId": course_id,
            "title": "Introduction to OpenAI and Platform Foundations",
            "slug": "introduction-to-openai-and-platform-foundations",
            "shortDescription": "Understand what OpenAI is, the platform mental model, and the core parameters you will use as a developer.",
            "fullDescription": "A foundation module that helps you understand OpenAI as an engineering platform and prepares you for hands-on usage.",
            "order": 1,
            "estimatedHours": 1.5,
            "topicCount": 10,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m02_api_fundamentals,
            "courseId": course_id,
            "title": "OpenAI API Fundamentals",
            "slug": "openai-api-fundamentals",
            "shortDescription": "Learn request/response basics, message design, rate limits, and common API patterns.",
            "fullDescription": "Build confidence with the OpenAI API primitives you'll use across projects.",
            "order": 2,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m03_prompt_foundations,
            "courseId": course_id,
            "title": "Prompt Engineering Foundations",
            "slug": "prompt-engineering-foundations",
            "shortDescription": "Write reliable instructions, constrain outputs, and debug prompts like an engineer.",
            "fullDescription": "Learn the craft of prompt engineering with practical patterns.",
            "order": 3,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m04_structured_outputs,
            "courseId": course_id,
            "title": "Structured Outputs and Response Control",
            "slug": "structured-outputs-and-response-control",
            "shortDescription": "Generate JSON you can trust and enforce shape constraints end-to-end.",
            "fullDescription": "Use structured outputs to build robust UI and workflows.",
            "order": 4,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m05_openai_fastapi,
            "courseId": course_id,
            "title": "OpenAI with Python and FastAPI",
            "slug": "openai-with-python-and-fastapi",
            "shortDescription": "Implement AI features on the backend with validation, auth, and reliable data contracts.",
            "fullDescription": "Learn how to integrate OpenAI into a production-minded FastAPI backend.",
            "order": 5,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m06_openai_react,
            "courseId": course_id,
            "title": "Building AI Features in React Frontend",
            "slug": "building-ai-features-in-react-frontend",
            "shortDescription": "Connect real backend AI APIs to a clean, usable React UI.",
            "fullDescription": "Build frontend experiences that make AI features understandable and practical.",
            "order": 6,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m07_embeddings,
            "courseId": course_id,
            "title": "Embeddings and Semantic Search",
            "slug": "embeddings-and-semantic-search",
            "shortDescription": "Represent text as vectors and power semantic search features.",
            "fullDescription": "Learn embeddings, similarity, and practical retrieval patterns.",
            "order": 7,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m08_rag,
            "courseId": course_id,
            "title": "RAG (Retrieval-Augmented Generation)",
            "slug": "rag-retrieval-augmented-generation",
            "shortDescription": "Combine retrieval with generation for grounded answers.",
            "fullDescription": "Learn practical RAG architecture and implementation steps.",
            "order": 8,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m09_function_calling,
            "courseId": course_id,
            "title": "Function Calling and Tool Usage",
            "slug": "function-calling-and-tool-usage",
            "shortDescription": "Make models call tools and produce structured actions safely.",
            "fullDescription": "Learn tool calling patterns and backend orchestration.",
            "order": 9,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m10_agents,
            "courseId": course_id,
            "title": "AI Agents and Workflow Design",
            "slug": "ai-agents-and-workflow-design",
            "shortDescription": "Design multi-step workflows using tools, memory, and guardrails.",
            "fullDescription": "Learn what agents are and how to build reliable agentic systems.",
            "order": 10,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m11_safety,
            "courseId": course_id,
            "title": "Safety, Security, and Governance",
            "slug": "safety-security-and-governance",
            "shortDescription": "Keep your AI features safe: moderation, data handling, and policy thinking.",
            "fullDescription": "A practical view of safety and governance in AI products.",
            "order": 11,
            "estimatedHours": 0.75,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m12_cost_perf,
            "courseId": course_id,
            "title": "Cost, Performance, and Scaling",
            "slug": "cost-performance-and-scaling",
            "shortDescription": "Optimize tokens, latency, caching, and system architecture.",
            "fullDescription": "Learn the trade-offs that matter in production AI systems.",
            "order": 12,
            "estimatedHours": 0.75,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m13_testing_eval,
            "courseId": course_id,
            "title": "Testing, Evaluation, and Quality Control",
            "slug": "testing-evaluation-and-quality-control",
            "shortDescription": "Test AI features with evaluation datasets and quality checks.",
            "fullDescription": "Practical evaluation strategies for AI outputs.",
            "order": 13,
            "estimatedHours": 0.75,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
        {
            "_id": IDS.m14_end_to_end,
            "courseId": course_id,
            "title": "End-to-End OpenAI Projects",
            "slug": "end-to-end-openai-projects",
            "shortDescription": "Build full projects that combine the concepts into real apps.",
            "fullDescription": "Ship end-to-end AI features with a complete backend and frontend flow.",
            "order": 14,
            "estimatedHours": 1.0,
            "topicCount": 0,
            "isPublished": True,
            "createdAt": now,
            "updatedAt": now,
        },
    ]
    return modules


def _module1_topic_docs(*, now: datetime) -> list[dict[str, Any]]:
    course_id = str(IDS.course_open_ai_mastery)
    module_id = str(IDS.m01_intro)
    base = {
        "courseId": course_id,
        "moduleId": module_id,
        "isPublished": True,
        "createdAt": now,
        "updatedAt": now,
        # default unlock rules for this first flow
        "unlockRules": {
            "requireViewBeforeMcq": True,
            "requireMcqPassBeforeSubjective": True,
            "mcqPassThreshold": 1.0,
        },
    }

    topics: list[dict[str, Any]] = [
        {
            **base,
            "_id": IDS.t01_what_is_openai,
            "title": "What is OpenAI?",
            "slug": "what-is-openai",
            "shortDescription": "Understand what OpenAI is, why it matters, and how developers use it to build smart applications.",
            "order": 1,
            "estimatedMinutes": 12,
        },
        {
            **base,
            "_id": IDS.t02_ai_vs_ml_vs_llm,
            "title": "AI vs ML vs LLM vs Generative AI",
            "slug": "ai-vs-ml-vs-llm-vs-generative-ai",
            "shortDescription": "Build clear definitions so you can reason about AI systems and avoid confusion in engineering discussions.",
            "order": 2,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t03_problems_openai_solves,
            "title": "What problems OpenAI solves",
            "slug": "what-problems-openai-solves",
            "shortDescription": "See where AI models create real value: language understanding, generation, extraction, and decision support.",
            "order": 3,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t04_platform_overview,
            "title": "OpenAI platform overview",
            "slug": "openai-platform-overview",
            "shortDescription": "Understand the platform components you will use as a developer: models, APIs, safety, and tooling.",
            "order": 4,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t05_models_overview,
            "title": "Models overview",
            "slug": "models-overview",
            "shortDescription": "Learn what a model is and how to choose one based on cost, latency, and task requirements.",
            "order": 5,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t06_tokens_context,
            "title": "Tokens and context window",
            "slug": "tokens-and-context-window",
            "shortDescription": "Understand how input/output tokens affect behavior, cost, and what a context window really means.",
            "order": 6,
            "estimatedMinutes": 12,
        },
        {
            **base,
            "_id": IDS.t07_temperature_top_p,
            "title": "Temperature, top_p, and max_tokens",
            "slug": "temperature-top-p-and-max-tokens",
            "shortDescription": "Control creativity and output length using key generation parameters.",
            "order": 7,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t08_api_first_thinking,
            "title": "API-first thinking",
            "slug": "api-first-thinking",
            "shortDescription": "Adopt the right architecture: backend owns security and workflows; OpenAI provides intelligence through APIs.",
            "order": 8,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t09_common_use_cases,
            "title": "Common use cases",
            "slug": "common-use-cases",
            "shortDescription": "Survey common patterns: chat assistants, summarization, extraction, classification, and search.",
            "order": 9,
            "estimatedMinutes": 10,
        },
        {
            **base,
            "_id": IDS.t10_limitations,
            "title": "Limitations and misconceptions",
            "slug": "limitations-and-misconceptions",
            "shortDescription": "Know limitations so you build guardrails and avoid unrealistic product expectations.",
            "order": 10,
            "estimatedMinutes": 10,
        },
    ]
    return topics


def _topic1_content_doc(*, now: datetime) -> dict[str, Any]:
    return {
        "_id": IDS.tc_t01,
        "topicId": str(IDS.t01_what_is_openai),
        "highLevelConcept": (
            "OpenAI is a platform that provides powerful AI models which developers can access through APIs. "
            "These models can understand text, generate content, answer questions, summarize information, "
            "classify data, assist in coding, and support intelligent workflows in applications."
        ),
        "deepConcept": (
            "OpenAI is not just a chatbot provider. From an engineering point of view, it is a platform that gives "
            "access to advanced AI models capable of language understanding, generation, reasoning-oriented tasks, "
            "extraction, summarization, and intelligent assistance. Instead of building machine learning systems from scratch, "
            "developers can consume these capabilities through APIs and integrate them into software systems.\n\n"
            "Why this matters:\n"
            "- Traditional software works on fixed rules\n"
            "- AI-powered systems can generate contextual outputs\n"
            "- Developers can add intelligence without training large models themselves\n\n"
            "Correct engineering mental model:\n"
            "- Application owns authentication, workflow, data, business logic, validation, permissions, and UI\n"
            "- OpenAI provides the intelligence layer"
        ),
        "walkthrough": [
            "User asks a question from frontend",
            "Frontend sends request to backend",
            "Backend prepares prompt/instruction",
            "Backend calls OpenAI API",
            "OpenAI returns response",
            "Backend formats structured JSON",
            "Frontend renders learning-friendly content",
        ],
        "demo": {
            "title": "AI Concept Explainer",
            "problem": "Learners struggle to understand technical concepts from dense documentation.",
            "solutionSummary": (
                "User enters a concept and gets a beginner explanation, a deep explanation, "
                "a real-world example, and a practice suggestion."
            ),
            "expectedOutputExample": {
                "title": "What is REST API?",
                "highLevel": "A REST API is a way for applications to communicate over HTTP.",
                "deepLevel": "It follows resource-oriented architecture using methods like GET, POST, PUT, DELETE.",
                "realWorldExample": "Food delivery app frontend talking to backend server.",
                "practiceSuggestion": "Try building a product API with GET and POST endpoints.",
            },
        },
        "developerManual": {
            "goal": "Build AI Concept Explainer using FastAPI + React + MongoDB + OpenAI API",
            "backendFlow": [
                "POST /ai/explain",
                "Input: concept, level",
                "Backend creates prompt",
                "Backend calls OpenAI",
                "Backend returns structured JSON",
            ],
            "expectedOutputExample": {
                "title": "What is REST API?",
                "highLevel": "A REST API is a way for applications to communicate over HTTP.",
                "deepLevel": "It follows resource-oriented architecture using methods like GET, POST, PUT, DELETE.",
                "realWorldExample": "Food delivery app frontend talking to backend server.",
                "practiceSuggestion": "Try building a product API with GET and POST endpoints.",
            },
        },
        "practiceUseCase": {
            "title": "AI FAQ Answering Assistant",
            "problem": "Users want quick answers from product documentation.",
            "practiceGoal": "Build an FAQ assistant using OpenAI-powered backend responses.",
        },
        "keyTakeaways": [
            "OpenAI provides AI capabilities through APIs",
            "It helps developers add intelligence without training models from scratch",
            "OpenAI is an intelligence layer, not the full application",
            "Backend should still control security, workflow, and business logic",
        ],
        "createdAt": now,
        "updatedAt": now,
    }


def _topic1_mcqs(*, now: datetime) -> list[dict[str, Any]]:
    tid = str(IDS.t01_what_is_openai)
    return [
        {
            "_id": IDS.mcq1,
            "topicId": tid,
            "question": "What is the main purpose of OpenAI for developers?",
            "options": [
                "To replace databases",
                "To provide AI capabilities through APIs",
                "To replace frontend frameworks",
                "To avoid writing backend code",
            ],
            "correctAnswer": "To provide AI capabilities through APIs",
            "explanation": "OpenAI helps developers integrate AI features through APIs.",
            "order": 1,
        },
        {
            "_id": IDS.mcq2,
            "topicId": tid,
            "question": "Which layer should remain responsible for business rules and access control?",
            "options": [
                "OpenAI model",
                "Frontend CSS",
                "Your application backend",
                "Browser local storage",
            ],
            "correctAnswer": "Your application backend",
            "explanation": "Business rules and access control belong in the backend.",
            "order": 2,
        },
        {
            "_id": IDS.mcq3,
            "topicId": tid,
            "question": "Which is a valid use case of OpenAI?",
            "options": [
                "Replacing MongoDB indexes",
                "Generating explanations and summaries",
                "Replacing HTTP protocol",
                "Creating CPU hardware",
            ],
            "correctAnswer": "Generating explanations and summaries",
            "explanation": "OpenAI is useful for language-based intelligent tasks.",
            "order": 3,
        },
    ]


def _topic1_subjectives(*, now: datetime) -> list[dict[str, Any]]:
    tid = str(IDS.t01_what_is_openai)
    return [
        {
            "_id": IDS.sq1,
            "topicId": tid,
            "question": "Explain in your own words what OpenAI is.",
            "sampleAnswer": (
                "OpenAI is a platform that gives developers access to AI models through APIs so apps can understand and generate language."
            ),
            "order": 1,
        },
        {
            "_id": IDS.sq2,
            "topicId": tid,
            "question": "How does OpenAI fit into a modern web application architecture?",
            "sampleAnswer": (
                "The application backend handles auth, business logic, and data; it calls OpenAI for intelligence and returns safe structured output."
            ),
            "order": 2,
        },
        {
            "_id": IDS.sq3,
            "topicId": tid,
            "question": "Why should developers not treat OpenAI as the entire application?",
            "sampleAnswer": (
                "Because OpenAI provides model outputs, but your app still must enforce rules, security, validation, permissions, and workflows."
            ),
            "order": 3,
        },
    ]


def _module1_topic_pairs() -> list[tuple[ObjectId, str]]:
    return [
        (IDS.t01_what_is_openai, "What is OpenAI?"),
        (IDS.t02_ai_vs_ml_vs_llm, "AI vs ML vs LLM vs Generative AI"),
        (IDS.t03_problems_openai_solves, "What problems OpenAI solves"),
        (IDS.t04_platform_overview, "OpenAI platform overview"),
        (IDS.t05_models_overview, "Models overview"),
        (IDS.t06_tokens_context, "Tokens and context window"),
        (IDS.t07_temperature_top_p, "Temperature, top_p, and max_tokens"),
        (IDS.t08_api_first_thinking, "API-first thinking"),
        (IDS.t09_common_use_cases, "Common use cases"),
        (IDS.t10_limitations, "Limitations and misconceptions"),
    ]


def _topic_content_doc(topic_order: int, topic_id: ObjectId, topic_title: str, *, now: datetime) -> dict[str, Any]:
    if topic_order == 1:
        return _topic1_content_doc(now=now)

    slug_hint = topic_title.lower().replace(" ", "-")
    return {
        "_id": ObjectId(f"{0xD000 + topic_order:024x}"),
        "topicId": str(topic_id),
        "highLevelConcept": (
            f"{topic_title} gives a practical foundation for developers building AI-powered products. "
            f"It explains the key idea in simple language and how to apply it in day-to-day engineering work."
        ),
        "deepConcept": (
            f"This topic dives deeper into {topic_title}. "
            "You should understand what this concept means, where it is used, common mistakes, and how to apply it safely in backend + frontend architecture. "
            "Focus on decision-making: when to use it, how to validate outputs, and how to keep business logic in your application layer."
        ),
        "walkthrough": [
            f"Define the core concept of: {topic_title}",
            "Connect the concept to an API request/response flow",
            "Show one backend implementation pattern",
            "Show one frontend usage pattern",
            "List one common mistake and one best practice",
        ],
        "demo": {
            "title": f"Live mini demo: {topic_title}",
            "problem": "Learners need hands-on testing instead of static theory.",
            "solutionSummary": "Use the built-in explainer demo to generate structured concept output.",
            "expectedOutputExample": {
                "title": topic_title,
                "highLevel": "Short beginner explanation.",
                "deepLevel": "Slightly technical explanation.",
                "realWorldExample": "One practical product example.",
                "practiceSuggestion": f"Implement one small API/UI feature for {slug_hint}.",
            },
        },
        "developerManual": {
            "goal": f"Apply {topic_title} in a FastAPI + React workflow.",
            "backendFlow": [
                "Read user input and validate it",
                "Prepare prompt/instructions",
                "Call AI API endpoint",
                "Return structured JSON response",
                "Render response in frontend section UI",
            ],
            "expectedOutputExample": {
                "title": topic_title,
                "highLevel": "Clear summary",
                "deepLevel": "Engineering depth",
                "realWorldExample": "Production use case",
                "practiceSuggestion": "Build and test one endpoint",
            },
        },
        "practiceUseCase": {
            "title": f"{topic_title} Practice Assistant",
            "problem": "Learners forget concepts without applying them.",
            "practiceGoal": f"Build one practical feature that uses {topic_title}.",
        },
        "keyTakeaways": [
            f"{topic_title} is important for reliable AI feature design.",
            "Backend still enforces rules, validation, and permissions.",
            "Frontend should consume structured responses and present clear UX.",
            "Measure output quality with tests and edge-case checks.",
        ],
        "createdAt": now,
        "updatedAt": now,
    }


def _topic_mcqs(topic_order: int, topic_id: ObjectId, topic_title: str) -> list[dict[str, Any]]:
    if topic_order == 1:
        return _topic1_mcqs(now=_now())

    tid = str(topic_id)
    base = 0xE000 + (topic_order * 0x10)
    return [
        {
            "_id": ObjectId(f"{base + 1:024x}"),
            "topicId": tid,
            "question": f"What is the best summary of '{topic_title}' for developers?",
            "options": [
                "It replaces backend logic completely",
                "It is a practical concept used to improve AI feature reliability",
                "It removes the need for validation",
                "It only matters for UI styling",
            ],
            "correctAnswer": "It is a practical concept used to improve AI feature reliability",
            "explanation": f"{topic_title} helps developers build more reliable AI workflows.",
            "order": 1,
        },
        {
            "_id": ObjectId(f"{base + 2:024x}"),
            "topicId": tid,
            "question": "Which layer must still enforce business rules?",
            "options": ["AI model only", "Browser cache", "Application backend", "CDN layer"],
            "correctAnswer": "Application backend",
            "explanation": "Business rules and access control remain backend responsibilities.",
            "order": 2,
        },
        {
            "_id": ObjectId(f"{base + 3:024x}"),
            "topicId": tid,
            "question": "What is the best way to learn this topic?",
            "options": [
                "Read once and skip implementation",
                "Use trial-and-error without tests",
                "Implement a small feature and verify behavior with real inputs",
                "Only memorize definitions",
            ],
            "correctAnswer": "Implement a small feature and verify behavior with real inputs",
            "explanation": "Practical implementation plus validation gives stronger understanding.",
            "order": 3,
        },
    ]


def _topic_subjectives(topic_order: int, topic_id: ObjectId, topic_title: str) -> list[dict[str, Any]]:
    if topic_order == 1:
        return _topic1_subjectives(now=_now())

    tid = str(topic_id)
    base = 0xF000 + (topic_order * 0x10)
    return [
        {
            "_id": ObjectId(f"{base + 1:024x}"),
            "topicId": tid,
            "question": f"Explain '{topic_title}' in your own words.",
            "sampleAnswer": f"{topic_title} is a practical concept that helps developers design reliable AI features.",
            "order": 1,
        },
        {
            "_id": ObjectId(f"{base + 2:024x}"),
            "topicId": tid,
            "question": f"How would you apply '{topic_title}' in a FastAPI + React project?",
            "sampleAnswer": "Use backend validation and structured responses, then render clear sections in frontend.",
            "order": 2,
        },
        {
            "_id": ObjectId(f"{base + 3:024x}"),
            "topicId": tid,
            "question": f"What common mistake should be avoided when implementing '{topic_title}'?",
            "sampleAnswer": "Do not move business rules into prompts only; enforce rules in backend services.",
            "order": 3,
        },
    ]


async def seed_open_ai_mastery(*, verbose: bool = True) -> dict[str, int]:
    now = _now()

    courses = get_courses_collection()
    modules = get_modules_collection()
    topics = get_topics_collection()
    topic_contents = get_topic_contents_collection()
    mcqs = get_mcqs_collection()
    subjectives = get_subjective_questions_collection()

    counts = {
        "courses": 0,
        "modules": 0,
        "topics": 0,
        "topic_contents": 0,
        "mcqs": 0,
        "subjective_questions": 0,
    }

    # Course
    await courses.replace_one(
        {"_id": IDS.course_open_ai_mastery},
        _course_doc(now=now),
        upsert=True,
    )
    counts["courses"] += 1

    # Modules
    for doc in _module_docs(now=now):
        await modules.replace_one({"_id": doc["_id"]}, doc, upsert=True)
        counts["modules"] += 1

    # Module 1 topics
    for doc in _module1_topic_docs(now=now):
        await topics.replace_one({"_id": doc["_id"]}, doc, upsert=True)
        counts["topics"] += 1

    # Module 1 full content + assessments (all 10 topics)
    for idx, (topic_oid, topic_title) in enumerate(_module1_topic_pairs(), start=1):
        content_doc = _topic_content_doc(idx, topic_oid, topic_title, now=now)
        await topic_contents.replace_one({"_id": content_doc["_id"]}, content_doc, upsert=True)
        counts["topic_contents"] += 1

        for doc in _topic_mcqs(idx, topic_oid, topic_title):
            await mcqs.replace_one({"_id": doc["_id"]}, doc, upsert=True)
            counts["mcqs"] += 1

        for doc in _topic_subjectives(idx, topic_oid, topic_title):
            await subjectives.replace_one({"_id": doc["_id"]}, doc, upsert=True)
            counts["subjective_questions"] += 1

    if verbose:
        print("Seeded Open AI Mastery:", counts)  # noqa: T201
        print("CourseId:", str(IDS.course_open_ai_mastery))  # noqa: T201
        print("Module1Id:", str(IDS.m01_intro))  # noqa: T201
        print("Topic1Id:", str(IDS.t01_what_is_openai))  # noqa: T201

    return counts


__all__ = ["IDS", "seed_open_ai_mastery"]
