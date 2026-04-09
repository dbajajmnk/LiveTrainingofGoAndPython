import { useEffect, useState } from 'react'
import { aiWithMcp, executeTool, getHealth, listAssets, listTools } from './api'
import './App.css'

function App() {
  const [tab, setTab] = useState('beginner')
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const [a, setA] = useState('2')
  const [b, setB] = useState('3')
  const [toolName, setToolName] = useState('get_user')
  const [toolArgs, setToolArgs] = useState('{"user_id":"user_1"}')
  const [query, setQuery] = useState('Please explain weather using MCP tool flow')

  useEffect(() => {
    getHealth().then(setHealth).catch(() => setHealth(null))
  }, [])

  async function runBeginner() {
    setLoading(true); setError(''); setResult(null)
    try {
      const tools = await listTools()
      const exec = await executeTool('add', { a: Number(a), b: Number(b) })
      setResult({ tools, exec })
    } catch (e) { setError(e.message || String(e)) } finally { setLoading(false) }
  }

  async function runIntermediate() {
    setLoading(true); setError(''); setResult(null)
    try {
      const args = JSON.parse(toolArgs || '{}')
      const [exec, assets] = await Promise.all([executeTool(toolName, args), listAssets()])
      setResult({ exec, ...assets })
    } catch (e) { setError(e.message || String(e)) } finally { setLoading(false) }
  }

  async function runAdvanced() {
    setLoading(true); setError(''); setResult(null)
    try {
      const out = await aiWithMcp(query)
      setResult(out)
    } catch (e) { setError(e.message || String(e)) } finally { setLoading(false) }
  }

  const action = tab === 'beginner' ? runBeginner : tab === 'intermediate' ? runIntermediate : runAdvanced

  return (
    <div className="app">
      <h1>MCP Server Lab</h1>
      <p className="sub">MCP Server = API layer for AI capabilities</p>
      <p className="meta">API health: {health ? `ok (openai: ${String(health.openai_configured)})` : 'loading...'}</p>

      <div className="tabs">
        <button className={tab === 'beginner' ? 'active' : ''} onClick={() => setTab('beginner')}>Beginner</button>
        <button className={tab === 'intermediate' ? 'active' : ''} onClick={() => setTab('intermediate')}>Intermediate</button>
        <button className={tab === 'advanced' ? 'active' : ''} onClick={() => setTab('advanced')}>Advanced</button>
      </div>

      {tab === 'beginner' && (
        <section className="panel">
          <label>A</label><input value={a} onChange={(e) => setA(e.target.value)} />
          <label>B</label><input value={b} onChange={(e) => setB(e.target.value)} />
          <p className="hint">Calls MCP tool <code>add</code> and also fetches tool catalog.</p>
        </section>
      )}

      {tab === 'intermediate' && (
        <section className="panel">
          <label>Tool name</label>
          <select value={toolName} onChange={(e) => setToolName(e.target.value)}>
            <option value="get_user">get_user</option>
            <option value="call_weather_api">call_weather_api</option>
            <option value="add">add</option>
          </select>
          <label>Arguments JSON</label>
          <textarea rows={4} value={toolArgs} onChange={(e) => setToolArgs(e.target.value)} />
          <p className="hint">Executes selected tool + lists resources and prompts.</p>
        </section>
      )}

      {tab === 'advanced' && (
        <section className="panel">
          <label>User query</label>
          <textarea rows={4} value={query} onChange={(e) => setQuery(e.target.value)} />
          <p className="hint">Backend plans tool, executes it, and asks OpenAI to explain trace.</p>
        </section>
      )}

      <button className="run" onClick={action} disabled={loading}>{loading ? 'Running...' : 'Run demo'}</button>
      {error ? <div className="error">{error}</div> : null}
      {result ? <pre className="out">{JSON.stringify(result, null, 2)}</pre> : null}
    </div>
  )
}

export default App
