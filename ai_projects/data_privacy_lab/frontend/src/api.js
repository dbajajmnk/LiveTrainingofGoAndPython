/**
 * Data Privacy Lab — API client.
 * Backend default: http://127.0.0.1:8012
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8012'

async function parseError(res) {
  try {
    const data = await res.json()
    return data.detail ?? JSON.stringify(data)
  } catch {
    return res.statusText || `HTTP ${res.status}`
  }
}

export async function beginnerMask(text) {
  const res = await fetch(`${API_BASE}/api/beginner/mask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function intermediateAsk(text) {
  const res = await fetch(`${API_BASE}/api/intermediate/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function advancedFlow(text, userId) {
  const res = await fetch(`${API_BASE}/api/advanced/privacy-flow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, user_id: userId }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function injectStaleRecord() {
  const res = await fetch(`${API_BASE}/api/advanced/inject-stale-record`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function storeStats() {
  const res = await fetch(`${API_BASE}/api/advanced/store-stats`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}
