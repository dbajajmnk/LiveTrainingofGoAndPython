import { useEffect, useState } from 'react'
import {
  advancedMonitor,
  beginnerAnalyze,
  intermediateAsk,
  sessionStats,
} from './api'
import './App.css'

const TABS = [
  {
    id: 'beginner',
    label: 'Beginner — shrink the prompt',
    blurb:
      'No OpenAI call. We count tokens with tiktoken and show how PROMPT_MAX_CHARS cuts input size.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate — cache + output cap',
    blurb:
      'Real completion with max_output_tokens. Turn caching on and ask the same question twice to see a cache hit.',
  },
  {
    id: 'advanced',
    label: 'Advanced — session monitor + rate limit',
    blurb:
      'Every action updates running totals (tokens + rough USD). Rate limit simulates protecting production budget.',
  },
]

function App() {
  const [tab, setTab] = useState('beginner')
  const [text, setText] = useState(
    'Paste a long explanation of microservices, Docker, and Kubernetes here. ' +
      'Repeat the same paragraph many times to see token savings when the backend truncates to PROMPT_MAX_CHARS.',
  )
  const [useCache, setUseCache] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [liveStats, setLiveStats] = useState(null)

  useEffect(() => {
    sessionStats()
      .then(setLiveStats)
      .catch(() => setLiveStats(null))
  }, [])

  async function refreshStats() {
    try {
      setLiveStats(await sessionStats())
    } catch {
      /* ignore */
    }
  }

  async function run() {
    setError('')
    setResult(null)
    setLoading(true)
    try {
      if (tab === 'beginner') {
        setResult({ kind: 'beginner', data: await beginnerAnalyze(text) })
      } else if (tab === 'intermediate') {
        setResult({
          kind: 'intermediate',
          data: await intermediateAsk(text, useCache),
        })
      } else {
        setResult({
          kind: 'advanced',
          data: await advancedMonitor(text, useCache),
        })
      }
      await refreshStats()
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  const active = TABS.find((t) => t.id === tab)

  return (
    <div className="app">
      <header className="header">
        <h1>Cost Control Lab</h1>
        <p className="subtitle">
          Live demo for your Day 30 “Cost control strategies” topic — tokens,
          caching, caps, and a session-level monitor.
        </p>
      </header>

      {liveStats ? (
        <aside className="stats-bar" aria-label="Session stats">
          <span>
            API calls: <strong>{liveStats.api_calls_to_openai}</strong>
          </span>
          <span>
            Cache hits: <strong>{liveStats.cache_hits}</strong>
          </span>
          <span>
            Tokens in/out:{' '}
            <strong>
              {liveStats.total_prompt_tokens} / {liveStats.total_completion_tokens}
            </strong>
          </span>
          <span>
            Est. USD (demo): <strong>{liveStats.estimated_usd_since_boot}</strong>
          </span>
          <button type="button" className="linkish" onClick={refreshStats}>
            Refresh
          </button>
        </aside>
      ) : null}

      <nav className="tabs" aria-label="Lesson level">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tab === t.id ? 'tab active' : 'tab'}
            onClick={() => {
              setTab(t.id)
              setResult(null)
              setError('')
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <p className="tab-blurb">{active?.blurb}</p>

      <section className="panel">
        <label className="label" htmlFor="msg">
          Your text
        </label>
        <textarea
          id="msg"
          className="textarea"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />

        {(tab === 'intermediate' || tab === 'advanced') && (
          <label className="check">
            <input
              type="checkbox"
              checked={useCache}
              onChange={(e) => setUseCache(e.target.checked)}
            />
            Use in-memory response cache (same prompt → skip OpenAI on repeat)
          </label>
        )}

        <button
          type="button"
          className="primary"
          disabled={loading || !text.trim()}
          onClick={run}
        >
          {loading ? 'Running…' : 'Run demo'}
        </button>

        {error ? (
          <div className="error" role="alert">
            {error}
          </div>
        ) : null}

        {result ? <Outcome tab={result.kind} data={result.data} /> : null}
      </section>

      <footer className="footer">
        <p>
          Backend routes: <code>/api/beginner/analyze</code>,{' '}
          <code>/api/intermediate/ask</code>, <code>/api/advanced/monitor</code>.
          Configure <code>PROMPT_MAX_CHARS</code> and{' '}
          <code>MAX_OUTPUT_TOKENS</code> in <code>backend/.env</code> during the
          talk.
        </p>
      </footer>
    </div>
  )
}

function Outcome({ tab, data }) {
  if (tab === 'beginner') {
    return (
      <div className="results">
        <h2>Token comparison (local only)</h2>
        <p className="hint">{data.explain}</p>
        <ul className="kv">
          <li>
            Characters: {data.original_characters} → {data.characters_after_shrink}{' '}
            (limit {data.prompt_max_chars_setting}
            {data.input_was_truncated ? ', truncated' : ''})
          </li>
          <li>
            Tiktoken on naive prompt (up to 12k chars):{' '}
            <strong>{data.tiktoken_naive_prompt}</strong> tokens
          </li>
          <li>
            Tiktoken after shrink: <strong>{data.tiktoken_after_shrink_prompt}</strong>{' '}
            tokens
          </li>
          <li>
            Estimated input tokens saved:{' '}
            <strong>{data.estimated_input_tokens_saved}</strong>
          </li>
        </ul>
        <div className="cols">
          <div>
            <h3>Naive prompt preview</h3>
            <pre className="pre">{data.naive_prompt_preview}</pre>
          </div>
          <div>
            <h3>Shrunk prompt preview</h3>
            <pre className="pre">{data.shrunk_prompt_preview}</pre>
          </div>
        </div>
      </div>
    )
  }

  if (tab === 'intermediate') {
    return <CompletionResult data={data} showSession={false} />
  }
  return <CompletionResult data={data} showSession />
}

function CompletionResult({ data, showSession }) {
  return (
    <div className="results">
      <h2>Model response</h2>
      <p className="hint">{data.lesson}</p>
      <ul className="kv">
        <li>
          Cache hit: <strong>{data.cache_hit ? 'yes (no API charge)' : 'no'}</strong>
        </li>
        <li>
          Model: <code>{data.model}</code>, max output tokens:{' '}
          <strong>{data.max_output_tokens}</strong>
        </li>
        <li>Input truncated to limit: {data.truncated_input ? 'yes' : 'no'}</li>
        {data.usage ? (
          <li>
            OpenAI usage: prompt {data.usage.prompt_tokens}, completion{' '}
            {data.usage.completion_tokens}, total {data.usage.total_tokens}
          </li>
        ) : (
          <li>OpenAI usage: (skipped — served from cache)</li>
        )}
        <li>
          Tiktoken estimate of user prompt sent:{' '}
          <strong>{data.tiktoken_estimate_sent_prompt}</strong>
        </li>
      </ul>
      <h3>Prompt preview (what the model saw)</h3>
      <pre className="pre">{data.prompt_sent_preview}</pre>
      <h3>Reply</h3>
      <pre className="pre">{data.reply}</pre>
      {showSession && data.session_totals ? (
        <>
          <h3>Session totals (this server process)</h3>
          <pre className="pre small">
            {JSON.stringify(data.session_totals, null, 2)}
          </pre>
          <p className="hint">{data.session_totals.pricing_note}</p>
        </>
      ) : null}
    </div>
  )
}

export default App
