import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function App() {
  const [capabilities, setCapabilities] = useState([])
  const [health, setHealth] = useState({ status: 'checking', message: 'Checking backend...' })
  const [activeTab, setActiveTab] = useState('chat')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const [prompt, setPrompt] = useState('Explain retrieval augmented generation in simple words.')
  const [structuredPrompt, setStructuredPrompt] = useState('Give a concise project brief for an AI customer support bot.')
  const [embeddingText, setEmbeddingText] = useState('OpenAI embeddings convert text into semantic vectors.')
  const [moderationText, setModerationText] = useState('This is a harmless sentence for moderation check.')
  const [imagePrompt, setImagePrompt] = useState('A clean futuristic dashboard UI with purple accents.')

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => res.json())
      .then((data) =>
        setHealth({
          status: data.status === 'ok' ? 'ok' : 'error',
          message: data.status === 'ok' ? 'Backend connected' : 'Backend unhealthy',
        }),
      )
      .catch(() => setHealth({ status: 'error', message: 'Backend unreachable' }))

    fetch(`${API_BASE}/api/capabilities`)
      .then((res) => res.json())
      .then((data) => setCapabilities(data.capabilities || []))
      .catch(() => setCapabilities([]))
  }, [])

  const tabs = useMemo(
    () => ['chat', 'structured', 'embeddings', 'moderation', 'image', 'models'],
    [],
  )

  const run = async (path, payload) => {
    setLoading(true)
    setResult(null)
    try {
      const options = payload
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        : { method: 'GET' }
      const res = await fetch(`${API_BASE}${path}`, options)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || 'Request failed')
      }
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>OpenAI Capability Explorer</h1>
        <p>Python + FastAPI backend and React + JavaScript + Vite frontend</p>
        <p className={health.status === 'ok' ? 'health ok' : 'health error'}>
          {health.message} ({API_BASE})
        </p>
      </header>

      <section className="card">
        <h2>Available Capabilities</h2>
        <div className="chips">
          {capabilities.map((item) => (
            <span key={item.id} className="chip">
              {item.title}
            </span>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Try Endpoints</h2>
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'chat' && (
          <div className="panel">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} />
            <button onClick={() => run('/api/chat', { prompt })}>Run Chat</button>
          </div>
        )}

        {activeTab === 'structured' && (
          <div className="panel">
            <textarea value={structuredPrompt} onChange={(e) => setStructuredPrompt(e.target.value)} rows={4} />
            <button onClick={() => run('/api/structured', { prompt: structuredPrompt })}>Run Structured Output</button>
          </div>
        )}

        {activeTab === 'embeddings' && (
          <div className="panel">
            <textarea value={embeddingText} onChange={(e) => setEmbeddingText(e.target.value)} rows={4} />
            <button onClick={() => run('/api/embeddings', { text: embeddingText })}>Run Embeddings</button>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="panel">
            <textarea value={moderationText} onChange={(e) => setModerationText(e.target.value)} rows={4} />
            <button onClick={() => run('/api/moderation', { text: moderationText })}>Run Moderation</button>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="panel">
            <textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} rows={4} />
            <button onClick={() => run('/api/image', { prompt: imagePrompt })}>Generate Image</button>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="panel">
            <button onClick={() => run('/api/models')}>List Models</button>
          </div>
        )}

        {loading && <p>Loading...</p>}

        {result && (
          <div className="result">
            <h3>Response</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            {Array.isArray(result.models) && (
              <p className="meta">Loaded {result.models.length} models.</p>
            )}
            {result.output?.base64 && (
              <img
                src={`data:image/png;base64,${result.output.base64}`}
                alt="Generated"
                className="generated"
              />
            )}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Backend</h2>
        <p>
          FastAPI endpoints: <code>/api/chat</code>, <code>/api/structured</code>, <code>/api/embeddings</code>,{' '}
          <code>/api/moderation</code>, <code>/api/image</code>, <code>/api/models</code>
        </p>
      </section>
    </div>
  )
}

export default App
