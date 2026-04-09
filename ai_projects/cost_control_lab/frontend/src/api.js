/**
 * Cost Control Lab — API helpers.
 * Default backend: port 8011 (see README).
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8011'

async function parseError(res) {
  try {
    const data = await res.json()
    return data.detail ?? JSON.stringify(data)
  } catch {
    return res.statusText || `HTTP ${res.status}`
  }
}

export async function beginnerAnalyze(text) {
  const res = await fetch(`${API_BASE}/api/beginner/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function intermediateAsk(text, useCache) {
  const res = await fetch(`${API_BASE}/api/intermediate/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, use_cache: useCache }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function advancedMonitor(text, useCache) {
  const res = await fetch(`${API_BASE}/api/advanced/monitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, use_cache: useCache }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function sessionStats() {
  const res = await fetch(`${API_BASE}/api/session/stats`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}
