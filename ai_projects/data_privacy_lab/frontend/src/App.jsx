import { useEffect, useState } from 'react'
import {
  advancedFlow,
  beginnerMask,
  injectStaleRecord,
  intermediateAsk,
  storeStats,
} from './api'
import './App.css'

const SAMPLE =
  'Contact me at deepak@example.com or 9876543210. ' +
  'My password is: hunter2. Card 4532-1234-5678-9010. ' +
  'Aadhaar 1234 5678 9999. Also sk_live_abcdefghijklmnop.'

const TABS = [
  {
    id: 'beginner',
    label: 'Beginner — mask email & phone',
    blurb:
      'No OpenAI call. Shows regex masking for email and 10-digit phones only.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate — privacy filter + AI',
    blurb:
      'Full redaction pipeline before the model; output is scanned again before it reaches the UI.',
  },
  {
    id: 'advanced',
    label: 'Advanced — logs + minimal store + retention',
    blurb:
      'Sanitized summary stored in memory, safe log line, 30-day retention. Inject a stale row to watch purge.',
  },
]

function App() {
  const [tab, setTab] = useState('beginner')
  const [text, setText] = useState(SAMPLE)
  const [userId, setUserId] = useState('student-demo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    storeStats()
      .then(setStats)
      .catch(() => setStats(null))
  }, [])

  async function refreshStats() {
    try {
      setStats(await storeStats())
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
        setResult({ kind: 'beginner', data: await beginnerMask(text) })
      } else if (tab === 'intermediate') {
        setResult({ kind: 'intermediate', data: await intermediateAsk(text) })
      } else {
        setResult({
          kind: 'advanced',
          data: await advancedFlow(text, userId),
        })
      }
      await refreshStats()
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  async function onInjectStale() {
    setError('')
    try {
      const data = await injectStaleRecord()
      await refreshStats()
      setResult({ kind: 'inject', data })
    } catch (e) {
      setError(e.message || String(e))
    }
  }

  const active = TABS.find((t) => t.id === tab)

  return (
    <div className="app">
      <header className="header">
        <h1>Data Privacy Lab</h1>
        <p className="subtitle">
          Collect less, mask more, protect always — live FastAPI + React demo for
          Day 30 “Data privacy considerations”.
        </p>
      </header>

      {stats ? (
        <aside className="stats-bar">
          <span>
            In-memory records (after retention):{' '}
            <strong>{stats.active_records}</strong>
          </span>
          <span>
            Retention: <strong>{stats.retention_days}</strong> days
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
          User message (try PII patterns from the theory doc)
        </label>
        <textarea
          id="msg"
          className="textarea"
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />

        {tab === 'advanced' && (
          <div className="field-row">
            <label className="label" htmlFor="uid">
              Fake user id (access-control story)
            </label>
            <input
              id="uid"
              className="input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="student-demo"
            />
          </div>
        )}

        <div className="actions">
          <button
            type="button"
            className="primary"
            disabled={loading || !text.trim()}
            onClick={run}
          >
            {loading ? 'Running…' : 'Run demo'}
          </button>
          {tab === 'advanced' && (
            <button
              type="button"
              className="secondary"
              onClick={onInjectStale}
            >
              Inject stale record (40d old)
            </button>
          )}
        </div>

        {error ? (
          <div className="error" role="alert">
            {error}
          </div>
        ) : null}

        {result ? <Outcome result={result} original={text} /> : null}
      </section>

      <footer className="footer">
        <p>
          OpenAI key stays on the server. Never paste real production secrets in
          the classroom UI — the sample text is synthetic.
        </p>
      </footer>
    </div>
  )
}

function Outcome({ result, original }) {
  if (result.kind === 'inject') {
    return (
      <div className="results">
        <h2>Stale row injected</h2>
        <pre className="pre">{JSON.stringify(result.data, null, 2)}</pre>
        <p className="hint">
          Run <strong>Advanced → Run demo</strong> once; the next flow should
          report <code>records_purged_this_request</code> ≥ 1 when retention runs.
        </p>
      </div>
    )
  }
  if (result.kind === 'beginner') {
    const d = result.data
    return (
      <div className="results">
        <h2>Masked text (local only)</h2>
        <p className="hint">{d.note}</p>
        <p className="badges">
          {d.categories_masked?.length
            ? d.categories_masked.map((c) => (
                <span key={c} className="badge">
                  {c}
                </span>
              ))
            : (
                <span className="badge muted">no email/phone pattern matched</span>
              )}
        </p>
        <h3>Original</h3>
        <pre className="pre">{original}</pre>
        <h3>After masking</h3>
        <pre className="pre">{d.masked_text}</pre>
      </div>
    )
  }
  if (result.kind === 'intermediate') {
    const d = result.data
    return (
      <div className="results">
        <h2>Intermediate — sanitized → OpenAI</h2>
        <p className="hint">{d.explain}</p>
        <h3>Rules applied to input</h3>
        <p className="badges">
          {d.input_rules_applied?.map((c) => (
            <span key={c} className="badge">
              {c}
            </span>
          ))}
        </p>
        <h3>Sanitized prompt (preview)</h3>
        <pre className="pre">{d.sanitized_prompt_preview}</pre>
        <h3>Model reply (output filter may have run)</h3>
        <pre className="pre">{d.model_reply}</pre>
        <h3>Output rules</h3>
        <p className="badges">
          {d.output_rules_applied?.length
            ? d.output_rules_applied.map((c) => (
                <span key={c} className="badge">
                  {c}
                </span>
              ))
            : (
                <span className="badge muted">no extra redaction on output</span>
              )}
        </p>
      </div>
    )
  }
  const d = result.data
  return (
    <div className="results">
      <h2>Advanced — full flow</h2>
      <p className="hint">{d.lesson}</p>
      <ul className="kv">
        <li>
          Records purged this request:{' '}
          <strong>{d.records_purged_this_request}</strong>
        </li>
        <li>
          Active records after:{' '}
          <strong>{d.store_stats_after?.active_records}</strong>
        </li>
      </ul>
      <h3>Masked log line (would go to your log sink)</h3>
      <pre className="pre">{d.masked_log_line}</pre>
      <h3>Minimal stored row (sanitized summary only)</h3>
      <pre className="pre">
        {JSON.stringify(d.stored_minimal_record, null, 2)}
      </pre>
      <h3>Sanitized prompt preview → model</h3>
      <pre className="pre">{d.sanitized_prompt_preview}</pre>
      <h3>Model reply</h3>
      <pre className="pre">{d.model_reply}</pre>
      <h3>Input / output rule tags</h3>
      <p className="badges">
        <span className="badge muted">in:</span>
        {d.input_rules_applied?.map((c) => (
          <span key={c} className="badge">
            {c}
          </span>
        ))}
        <span className="badge muted">out:</span>
        {d.output_rules_applied?.map((c) => (
          <span key={c} className="badge">
            {c}
          </span>
        ))}
      </p>
    </div>
  )
}

export default App
