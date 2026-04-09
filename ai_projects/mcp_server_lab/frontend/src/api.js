const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8013'

async function parseError(res) {
  try {
    const data = await res.json()
    return data.detail ?? JSON.stringify(data)
  } catch {
    return res.statusText || `HTTP ${res.status}`
  }
}

export async function getHealth() {
  const res = await fetch(`${API_BASE}/api/health`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function listTools() {
  const res = await fetch(`${API_BASE}/api/mcp/tools`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function executeTool(tool_name, argumentsObj) {
  const res = await fetch(`${API_BASE}/api/mcp/tools/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tool_name, arguments: argumentsObj }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function listAssets() {
  const [resourcesRes, promptsRes] = await Promise.all([
    fetch(`${API_BASE}/api/mcp/resources`),
    fetch(`${API_BASE}/api/mcp/prompts`),
  ])
  if (!resourcesRes.ok) throw new Error(await parseError(resourcesRes))
  if (!promptsRes.ok) throw new Error(await parseError(promptsRes))
  return { resources: await resourcesRes.json(), prompts: await promptsRes.json() }
}

export async function aiWithMcp(query) {
  const res = await fetch(`${API_BASE}/api/advanced/ai-with-mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}
