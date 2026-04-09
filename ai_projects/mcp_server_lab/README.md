# MCP Server Lab

FastAPI + React demo for teaching MCP concepts:

- Beginner: call a simple MCP tool (`add`)
- Intermediate: execute chosen tool + read resources/prompts
- Advanced: AI + MCP orchestration trace (tool plan -> execute -> explain)

## Run backend (port 8013)

```powershell
cd ai_projects\mcp_server_lab\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 8013
```

## Run frontend

```powershell
cd ai_projects\mcp_server_lab\frontend
copy .env.example .env
npm install
npm run dev
```

`VITE_API_BASE_URL` defaults to `http://127.0.0.1:8013`.
