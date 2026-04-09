from __future__ import annotations

from typing import Any

TOOLS: dict[str, dict[str, Any]] = {
    "add": {
        "description": "Add two numbers",
        "input_schema": {
            "type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}},
            "required": ["a", "b"],
        },
    },
    "get_user": {
        "description": "Fetch mock user profile",
        "input_schema": {
            "type": "object",
            "properties": {"user_id": {"type": "string"}},
            "required": ["user_id"],
        },
    },
    "call_weather_api": {
        "description": "Mock external API call for weather",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}


def execute_tool(name: str, args: dict[str, Any]) -> dict[str, Any]:
    if name == "add":
        return {"result": float(args.get("a", 0)) + float(args.get("b", 0))}
    if name == "get_user":
        uid = str(args.get("user_id", ""))
        return {
            "user_id": uid,
            "name": "Deepak" if uid == "user_1" else "Guest",
            "role": "student" if uid == "user_1" else "viewer",
        }
    if name == "call_weather_api":
        city = str(args.get("city", "Bengaluru"))
        return {
            "city": city,
            "temperature_c": 29,
            "condition": "Cloudy",
            "source": "mock-weather-api",
        }
    raise ValueError(f"Unknown tool: {name}")


def list_tools() -> list[dict[str, Any]]:
    return [{"name": name, **meta} for name, meta in TOOLS.items()]
