import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { apiClient, formatApiDetail } from "../../services/apiClient";

const tabList = ["chat", "structured", "embeddings", "moderation", "image", "models"];

export default function CapabilityLabPage() {
  const { authHeaders } = useAuth();
  const [tab, setTab] = useState("chat");
  const [capabilities, setCapabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    chat: "Explain vector databases in simple words.",
    structured: "Create a mini brief for AI study planner app.",
    embeddings: "OpenAI embeddings represent meaning as vectors.",
    moderation: "This sentence is polite and harmless.",
    image: "A modern student dashboard with material design cards",
    imageSize: "1024x1024",
  });

  useEffect(() => {
    apiClient
      .request("/api/capabilities", { headers: authHeaders })
      .then((d) => setCapabilities(d.capabilities || []))
      .catch(() => setCapabilities([]));
  }, [authHeaders]);

  const run = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const map = {
        chat: { path: "/api/chat", body: { prompt: form.chat } },
        structured: { path: "/api/structured", body: { prompt: form.structured } },
        embeddings: { path: "/api/embeddings", body: { text: form.embeddings } },
        moderation: { path: "/api/moderation", body: { text: form.moderation } },
        image: { path: "/api/image", body: { prompt: form.image, size: form.imageSize } },
        models: { path: "/api/models" },
      };
      const config = map[tab];
      const data = await apiClient.request(config.path, {
        method: config.body ? "POST" : "GET",
        headers: authHeaders,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : formatApiDetail(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        OpenAI Capability Lab
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" mb={1}>
            Available capabilities
          </Typography>
          <Typography color="text.secondary">
            {capabilities.map((c) => c.title).join(" | ") || "No capability metadata loaded."}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
            {tabList.map((item) => (
              <Tab key={item} value={item} label={item} />
            ))}
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tab === "chat" && (
              <TextField label="Prompt" fullWidth multiline minRows={3} value={form.chat} onChange={(e) => setForm((v) => ({ ...v, chat: e.target.value }))} />
            )}
            {tab === "structured" && (
              <TextField label="Prompt" fullWidth multiline minRows={3} value={form.structured} onChange={(e) => setForm((v) => ({ ...v, structured: e.target.value }))} />
            )}
            {tab === "embeddings" && (
              <TextField label="Text" fullWidth multiline minRows={3} value={form.embeddings} onChange={(e) => setForm((v) => ({ ...v, embeddings: e.target.value }))} />
            )}
            {tab === "moderation" && (
              <TextField label="Text" fullWidth multiline minRows={3} value={form.moderation} onChange={(e) => setForm((v) => ({ ...v, moderation: e.target.value }))} />
            )}
            {tab === "image" && (
              <Stack spacing={2}>
                <TextField label="Prompt" fullWidth multiline minRows={3} value={form.image} onChange={(e) => setForm((v) => ({ ...v, image: e.target.value }))} />
                <TextField
                  select
                  label="Image Size"
                  value={form.imageSize}
                  onChange={(e) => setForm((v) => ({ ...v, imageSize: e.target.value }))}
                >
                  {["1024x1024", "1536x1024", "1024x1536"].map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}
            <Button sx={{ mt: 2 }} variant="contained" onClick={run} disabled={loading}>
              {loading ? "Running..." : `Run ${tab}`}
            </Button>
          </Box>
        </CardContent>
      </Card>
      {error && <Alert severity="error">{error}</Alert>}
      {result && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" mb={1}>Response</Typography>
            <Box component="pre" sx={{ p: 2, bgcolor: "#0f172a", color: "#e2e8f0", borderRadius: 1, overflowX: "auto" }}>
              {JSON.stringify(result, null, 2)}
            </Box>
            {result.output?.base64 && (
              <Box component="img" alt="Generated by OpenAI" src={`data:image/png;base64,${result.output.base64}`} sx={{ mt: 2, maxWidth: "100%", borderRadius: 1 }} />
            )}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
