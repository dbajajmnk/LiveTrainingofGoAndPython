from __future__ import annotations

from typing import Any

RESOURCES: dict[str, dict[str, Any]] = {
    "getting-started": {
        "title": "MCP quick notes",
        "content": "MCP exposes tools, resources, and prompts to AI hosts.",
    },
    "architecture": {
        "title": "MCP architecture",
        "content": "AI host -> MCP client -> MCP server -> Tool/Resource -> AI response",
    },
}

PROMPTS: dict[str, str] = {
    "explain_simple": "Explain {topic} in simple terms with 3 bullets.",
    "compare": "Compare {a} and {b} from an engineering perspective.",
}


def get_resource(name: str) -> dict[str, Any] | None:
    return RESOURCES.get(name)


def list_resources() -> list[dict[str, Any]]:
    return [{"name": k, **v} for k, v in RESOURCES.items()]


def list_prompts() -> list[dict[str, str]]:
    return [{"name": k, "template": v} for k, v in PROMPTS.items()]
