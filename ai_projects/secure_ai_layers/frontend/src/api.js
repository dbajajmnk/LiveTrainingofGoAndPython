/**
 * Thin fetch helpers for the three teaching endpoints.
 *
 * VITE_API_BASE_URL — FastAPI origin (default: local backend on 8010).
 * VITE_DEMO_API_KEY — optional; sent as X-API-Key for the Advanced demo only.
 *   Must match backend DEMO_API_KEY when that env var is set server-side.
 *
 * Never put your OpenAI secret in the frontend; only the server uses OPENAI_API_KEY.
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8010'

const DEMO_KEY = import.meta.env.VITE_DEMO_API_KEY || ''

async function parseError(res) {
  try {
    const data = await res.json()
    return data.detail ?? JSON.stringify(data)
  } catch {
    return res.statusText || `HTTP ${res.status}`
  }
}

export async function beginnerSanitize(text) {
  const res = await fetch(`${API_BASE}/api/beginner/sanitize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function intermediateComplete(text) {
  const res = await fetch(`${API_BASE}/api/intermediate/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function advancedSecureChat(text) {
  const headers = { 'Content-Type': 'application/json' }
  // Optional second layer: shared demo secret (not the OpenAI key).
  if (DEMO_KEY) headers['X-API-Key'] = DEMO_KEY

  const res = await fetch(`${API_BASE}/api/advanced/secure-chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}
