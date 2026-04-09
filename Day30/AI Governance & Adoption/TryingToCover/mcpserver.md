Yes — you can run an **MCP server locally** and use **Python + FastAPI** to call it.

The cleanest local setup is:

1. build a local MCP server in Python
2. run it on `http://localhost:8000/mcp` using the official Python MCP SDK
3. create a FastAPI app that acts as your normal backend and calls that MCP server as a client ([GitHub][1])

The official Python SDK supports creating MCP servers and clients, and supports `stdio`, `SSE`, and `Streamable HTTP` transports. The quickstart example in the SDK shows `FastMCP(...).run(transport="streamable-http")`, and its example local URL is `http://localhost:8000/mcp`. The SDK install command shown in the repo is `pip install "mcp[cli]"` or `uv add "mcp[cli]"`. ([GitHub][1])

## What you will build

You will have two local services:

* **MCP Server**: exposes tools such as `add`, `echo`, `get_user_profile`, `search_docs`
* **FastAPI App**: your application backend, which calls those MCP tools and returns normal REST responses

This separation is usually the easiest way to work locally. It avoids some of the lifecycle and mounting issues people have run into when trying to embed Streamable HTTP directly inside an existing FastAPI app. ([GitHub][1])

---

## 1) Install dependencies

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate

# macOS/Linux
# source .venv/bin/activate

pip install "mcp[cli]" fastapi uvicorn httpx
```

That matches the official MCP Python SDK install guidance for the MCP package, and FastAPI/Uvicorn are the normal pieces for your API service. ([GitHub][1])

---

## 2) Create the local MCP server

Create `mcp_server.py`:

```python
from mcp.server.fastmcp import FastMCP

# Create MCP server
mcp = FastMCP("LocalTools", json_response=True)

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

@mcp.tool()
def greet(name: str) -> str:
    """Return a greeting"""
    return f"Hello, {name}!"

@mcp.tool()
def get_employee_details(emp_code: str) -> dict:
    """Fake employee lookup"""
    fake_db = {
        "E101": {"name": "Deepak", "role": "Backend Engineer", "location": "Gurgaon"},
        "E102": {"name": "Amit", "role": "QA Engineer", "location": "Hyderabad"},
    }
    return fake_db.get(emp_code, {"error": "Employee not found"})

if __name__ == "__main__":
    # Runs Streamable HTTP server locally
    # Default local endpoint is typically available under /mcp
    mcp.run(transport="streamable-http")
```

This follows the official SDK pattern: create `FastMCP`, decorate tools with `@mcp.tool()`, and run it with `transport="streamable-http"`. ([GitHub][1])

Run it:

```bash
python mcp_server.py
```

After it starts, the MCP endpoint should be available locally at:

```text
http://localhost:8000/mcp
```

That local endpoint pattern is shown in the official SDK quickstart. ([GitHub][1])

---

## 3) Create FastAPI app that uses the local MCP server

Create `app.py`:

```python
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client


MCP_URL = "http://localhost:8000/mcp"


class AddRequest(BaseModel):
    a: int
    b: int


class GreetRequest(BaseModel):
    name: str


class EmployeeRequest(BaseModel):
    emp_code: str


async def call_mcp_tool(tool_name: str, arguments: dict):
    """
    Connect to the local MCP server, initialize session,
    call the tool, and return the result.
    """
    try:
        async with streamablehttp_client(MCP_URL) as (read_stream, write_stream, _):
            async with ClientSession(read_stream, write_stream) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, arguments=arguments)
                return result
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"MCP call failed: {str(exc)}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # You could do health checks here if you want
    yield


app = FastAPI(title="FastAPI + Local MCP Client", lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "FastAPI client for local MCP server is running"}


@app.post("/add")
async def add_numbers(payload: AddRequest):
    result = await call_mcp_tool("add", {"a": payload.a, "b": payload.b})
    return {"tool": "add", "result": result.model_dump() if hasattr(result, "model_dump") else str(result)}


@app.post("/greet")
async def greet_user(payload: GreetRequest):
    result = await call_mcp_tool("greet", {"name": payload.name})
    return {"tool": "greet", "result": result.model_dump() if hasattr(result, "model_dump") else str(result)}


@app.post("/employee")
async def get_employee(payload: EmployeeRequest):
    result = await call_mcp_tool("get_employee_details", {"emp_code": payload.emp_code})
    return {"tool": "get_employee_details", "result": result.model_dump() if hasattr(result, "model_dump") else str(result)}
```

The MCP documentation includes a Python client flow built around `ClientSession`, session initialization, and connecting to MCP servers from Python clients. ([Model Context Protocol][2])

Run FastAPI:

```bash
uvicorn app:app --reload --port 9000
```

Now test:

```bash
curl -X POST "http://127.0.0.1:9000/add" \
  -H "Content-Type: application/json" \
  -d "{\"a\": 10, \"b\": 20}"
```

```bash
curl -X POST "http://127.0.0.1:9000/greet" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Deepak\"}"
```

```bash
curl -X POST "http://127.0.0.1:9000/employee" \
  -H "Content-Type: application/json" \
  -d "{\"emp_code\": \"E101\"}"
```

---

## 4) Folder structure

```text
your-project/
│
├── mcp_server.py
├── app.py
└── requirements.txt
```

Example `requirements.txt`:

```txt
mcp[cli]
fastapi
uvicorn
httpx
```

---

## 5) How the flow works

Your FastAPI app does **not** directly implement the tool logic. Instead:

* FastAPI receives the REST request
* FastAPI connects to the local MCP server
* MCP session initializes
* FastAPI calls an MCP tool like `add` or `get_employee_details`
* MCP server returns the tool result
* FastAPI formats it as a normal JSON API response ([Model Context Protocol][2])

This is a nice pattern because:

* your tool layer is reusable across MCP-capable clients
* your main application stays a normal FastAPI app
* later you can plug the same MCP server into ChatGPT, Claude, Cursor, or custom agents if they support MCP ([GitHub][1])

---

## 6) Test with MCP Inspector

A common local testing option is **MCP Inspector**. One sample repo documents running it with:

```bash
npx @modelcontextprotocol/inspector
```

and then connecting to your local HTTP MCP endpoint. ([GitHub][3])

For a local server like the one above, use the endpoint:

```text
http://localhost:8000/mcp
```

If your setup uses a sample app that exposes `/mcp/stream`, use that route instead; this depends on how the app is wired. The Azure sample shows `/mcp/stream`, while the official quickstart shows `http://localhost:8000/mcp`. ([GitHub][3])

---

## 7) Important practical note

For **local development**, running the MCP server as its own process is the safest path. There have been FastAPI mounting/lifespan issues reported when people try to directly mount the SDK’s Streamable HTTP app into an existing FastAPI application without the right session manager lifecycle. ([GitHub][4])

Also, some remote deployments have reported transport quirks with Streamable HTTP, while local development is usually straightforward. ([GitHub][5])

---

## 8) When to use this architecture

Use this when you want:

* **FastAPI** as your main backend
* **MCP** as a reusable tool layer
* local development first
* future compatibility with MCP-aware clients

Do **not** use MCP for everything. If your app is only internal and only FastAPI consumes those functions, a normal Python service layer may be simpler. MCP is most useful when you want those tools exposed in a standard way for agent/LLM clients too. ([GitHub][1])

---

## 9) Minimal command sequence

```bash
# terminal 1
python mcp_server.py

# terminal 2
uvicorn app:app --reload --port 9000
```

Then open:

```text
http://127.0.0.1:9000/docs
```

That gives you Swagger UI for testing your FastAPI endpoints. FastAPI/Uvicorn local docs endpoints are also shown in the sample FastAPI-based MCP repo. ([GitHub][3])

---

## 10) Best next step

The best production-minded version is:

* `mcp_server.py` for tools
* `app.py` for REST APIs
* optional auth in FastAPI
* logging + retries around MCP calls
* health check endpoint to verify the MCP server is reachable

I can turn this into a **complete starter project** with:

* proper folder structure
* `.env`
* health check
* error handling
* example business tools
* ready-to-run code for Cursor or VS Code.

[1]: https://github.com/modelcontextprotocol/python-sdk "GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients · GitHub"
[2]: https://modelcontextprotocol.io/docs/develop/build-client "Build an MCP client - Model Context Protocol"
[3]: https://github.com/Azure-Samples/remote-mcp-webapp-python-auth "GitHub - Azure-Samples/remote-mcp-webapp-python-auth · GitHub"
[4]: https://github.com/modelcontextprotocol/python-sdk/issues/1367?utm_source=chatgpt.com "Mounting a Streamable HTTP MCP endpoint on existing ..."
[5]: https://github.com/modelcontextprotocol/python-sdk/issues/1053?utm_source=chatgpt.com "Streamable HTTP transport fails when accessing MCP ..."
