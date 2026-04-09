from __future__ import annotations

from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from core.config import settings
from services.ai_orchestrator import run_ai_with_mcp
from services.mcp_assets import get_resource, list_prompts, list_resources
from services.mcp_tools import execute_tool, list_tools

app = FastAPI(
    title="MCP Server Lab",
    version="0.1.0",
    description="Teaching lab for MCP tools/resources/prompts and AI orchestration.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ToolCallIn(BaseModel):
    tool_name: str = Field(..., min_length=1)
    arguments: dict[str, Any] = Field(default_factory=dict)


class QueryIn(BaseModel):
    query: str = Field(..., min_length=1, max_length=4000)


@app.get("/api/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "openai_configured": bool(settings.OPENAI_API_KEY),
    }


@app.get("/api/mcp/tools")
def mcp_tools() -> dict[str, Any]:
    return {"tools": list_tools()}


@app.post("/api/mcp/tools/execute")
def mcp_tools_execute(body: ToolCallIn) -> dict[str, Any]:
    try:
        result = execute_tool(body.tool_name, body.arguments)
        return {
            "tool": body.tool_name,
            "arguments": body.arguments,
            "result": result,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/api/mcp/resources")
def mcp_resources() -> dict[str, Any]:
    return {"resources": list_resources()}


@app.get("/api/mcp/resources/{name}")
def mcp_resource(name: str) -> dict[str, Any]:
    item = get_resource(name)
    if not item:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"name": name, **item}


@app.get("/api/mcp/prompts")
def mcp_prompts() -> dict[str, Any]:
    return {"prompts": list_prompts()}


@app.post("/api/advanced/ai-with-mcp")
def advanced_ai_with_mcp(body: QueryIn) -> dict[str, Any]:
    try:
        return run_ai_with_mcp(body.query)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="AI orchestration failed") from exc