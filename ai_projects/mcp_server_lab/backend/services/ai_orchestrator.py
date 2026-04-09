from __future__ import annotations

from typing import Any

from openai import OpenAI

from core.config import settings
from services.mcp_tools import execute_tool


def _client() -> OpenAI:
    if not settings.OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not configured.")
    return OpenAI(api_key=settings.OPENAI_API_KEY)


def _plan_tool(query: str) -> tuple[str, dict[str, Any]]:
    q = query.lower()
    if "add" in q or "sum" in q or "plus" in q:
        return "add", {"a": 12, "b": 8}
    if "weather" in q:
        return "call_weather_api", {"city": "Bengaluru"}
    if "user" in q or "profile" in q:
        return "get_user", {"user_id": "user_1"}
    return "get_user", {"user_id": "user_1"}


def run_ai_with_mcp(user_query: str) -> dict[str, Any]:
    tool_name, tool_args = _plan_tool(user_query)
    tool_result = execute_tool(tool_name, tool_args)

    client = _client()
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are an assistant explaining MCP traces clearly for students.",
            },
            {
                "role": "user",
                "content": (
                    "User query: " + user_query + "\n"
                    "Planned MCP tool: " + tool_name + "\n"
                    "Tool result JSON: " + str(tool_result) + "\n"
                    "Explain in simple bullets: what happened and why MCP helps."
                ),
            },
        ],
        max_tokens=350,
        temperature=0.3,
        timeout=40.0,
    )
    explanation = (response.choices[0].message.content or "").strip()
    return {
        "query": user_query,
        "planned_tool": tool_name,
        "tool_args": tool_args,
        "tool_result": tool_result,
        "ai_explanation": explanation,
    }