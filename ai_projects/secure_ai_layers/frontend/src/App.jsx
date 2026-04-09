import { useState } from 'react'
import {
  advancedSecureChat,
  beginnerSanitize,
  intermediateComplete,
} from './api'
import './App.css'

/**
 * One-page lab: three tabs map to Beginner / Intermediate / Advanced concepts.
 * Read the comments in `backend/services/*.py` for the teaching narrative.
 */
const TABS = [
  { id: 'beginner', label: 'Beginner — sanitize input' },
  { id: 'intermediate', label: 'Intermediate — output filter' },
  { id: 'advanced', label: 'Advanced — secure AI API' },
]

function App() {
  const [tab, setTab] = useState('beginner')
  const [text, setText] = useState(
    'Hello! Try: <script>alert(1)</script> or a long paste to see limits.',
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  async function run() {
    setError('')
    setResult(null)
    setLoading(true)
    try {
      if (tab === 'beginner') {
        const data = await beginnerSanitize(text)
        setResult({ type: 'beginner', data })
      } else if (tab === 'intermediate') {
        const data = await intermediateComplete(text)
        setResult({ type: 'intermediate', data })
      } else {
        const data = await advancedSecureChat(text)
        setResult({ type: 'advanced', data })
      }
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Secure AI Layers</h1>
        <p className="subtitle">
          FastAPI + React teaching lab: sanitize → filter → hardened API surface.
        </p>
      </header>

      <nav className="tabs" aria-label="Concept level">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tab === t.id ? 'tab active' : 'tab'}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="panel">
        <label className="label" htmlFor="user-text">
          Your message
        </label>
        <textarea
          id="user-text"
          className="textarea"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
        <button
          type="button"
          className="primary"
          disabled={loading || !text.trim()}
          onClick={run}
        >
          {loading ? 'Working…' : 'Send to API'}
        </button>

        {error ? (
          <div className="error" role="alert">
            {error}
          </div>
        ) : null}

        {result ? <ResultView tab={result.type} payload={result.data} /> : null}
      </section>

      <footer className="footer">
        <p>
          Backend: <code>/api/beginner/sanitize</code>,{' '}
          <code>/api/intermediate/complete</code>,{' '}
          <code>/api/advanced/secure-chat</code>. OpenAI key stays on the server
          only.
        </p>
      </footer>
    </div>
  )
}

/** Renders JSON-ish panels without using dangerouslySetInnerHTML. */
function ResultView({ tab, payload }) {
  if (tab === 'beginner') {
    return (
      <div className="results">
        <h2>Server response</h2>
        <p className="hint">{payload.hint}</p>
        <div className="field">
          <span className="field-label">sanitized (HTML-safe for display)</span>
          <pre className="pre">{payload.sanitized}</pre>
        </div>
      </div>
    )
  }
  if (tab === 'intermediate') {
    return (
      <div className="results">
        <h2>Raw vs filtered model output</h2>
        <p className="hint">
          Compare the two: the filter strips code fences and URLs in this demo
          policy.
        </p>
        <div className="field">
          <span className="field-label">raw_reply</span>
          <pre className="pre">{payload.raw_reply}</pre>
        </div>
        <div className="field">
          <span className="field-label">filtered_reply</span>
          <pre className="pre">{payload.filtered_reply}</pre>
        </div>
        <p className="meta">model: {payload.model}</p>
      </div>
    )
  }
  return (
    <div className="results">
      <h2>Secure chat (filtered only)</h2>
      <p className="hint">
        Advanced route returns only the filtered reply and may enforce rate
        limits and <code>X-API-Key</code> when configured.
      </p>
      <div className="field">
        <span className="field-label">reply</span>
        <pre className="pre">{payload.reply}</pre>
      </div>
      <p className="meta">model: {payload.model}</p>
    </div>
  )
}

export default App
