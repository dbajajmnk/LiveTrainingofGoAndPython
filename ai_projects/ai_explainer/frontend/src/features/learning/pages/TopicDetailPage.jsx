import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  getAssessmentGate,
  explainConcept,
  getTopic,
  listTopicMcqs,
  listTopicSubjectives,
  markTopicViewed,
  submitTopicMcq,
  submitTopicSubjectives,
} from "../api/learningApi";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import LockedSection from "../components/LockedSection";
import McqForm from "../components/McqForm";
import SubjectiveForm from "../components/SubjectiveForm";

export default function TopicDetailPage() {
  const { topicId } = useParams();
  const { authHeaders } = useAuth();

  const [topicDetail, setTopicDetail] = useState(null);
  const [gate, setGate] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [subjectives, setSubjectives] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mcqSubmitting, setMcqSubmitting] = useState(false);
  const [mcqResult, setMcqResult] = useState(null);
  const [subjectiveSubmitting, setSubjectiveSubmitting] = useState(false);
  const [subjectiveSubmitted, setSubjectiveSubmitted] = useState(false);
  const [demoConcept, setDemoConcept] = useState("What is REST API?");
  const [demoLevel, setDemoLevel] = useState("beginner");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoResult, setDemoResult] = useState(null);
  const [demoError, setDemoError] = useState("");

  const topic = topicDetail?.topic;
  const content = topicDetail?.content;

  const reloadGateAndAssessments = useCallback(async () => {
    const gateData = await getAssessmentGate(topicId, authHeaders);
    setGate(gateData);

    if (gateData.mcqUnlocked) {
      const mcqData = await listTopicMcqs(topicId, authHeaders);
      setMcqs(Array.isArray(mcqData) ? mcqData : []);
    } else {
      setMcqs([]);
    }

    if (gateData.subjectiveUnlocked) {
      const subjectiveData = await listTopicSubjectives(topicId, authHeaders);
      setSubjectives(Array.isArray(subjectiveData) ? subjectiveData : []);
    } else {
      setSubjectives([]);
    }
  }, [authHeaders, topicId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const detail = await getTopic(topicId);
      setTopicDetail(detail);

      if (detail?.topic?.courseId && detail?.topic?.moduleId) {
        await markTopicViewed(
          {
            courseId: detail.topic.courseId,
            moduleId: detail.topic.moduleId,
            topicId: detail.topic.id,
          },
          authHeaders,
        );
      }

      await reloadGateAndAssessments();
    } catch (err) {
      setError(err.message || "Failed to load topic details.");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, reloadGateAndAssessments, topicId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmitMcq = async (payload) => {
    setMcqSubmitting(true);
    setError("");
    try {
      const result = await submitTopicMcq(topicId, payload, authHeaders);
      setMcqResult(result);
      await reloadGateAndAssessments();
    } catch (err) {
      setError(err.message || "Failed to submit MCQ.");
    } finally {
      setMcqSubmitting(false);
    }
  };

  const handleSubmitSubjectives = async (payload) => {
    setSubjectiveSubmitting(true);
    setError("");
    try {
      await submitTopicSubjectives(topicId, payload, authHeaders);
      setSubjectiveSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit subjective answers.");
    } finally {
      setSubjectiveSubmitting(false);
    }
  };

  const handleRunDemo = async () => {
    setDemoLoading(true);
    setDemoError("");
    try {
      const data = await explainConcept(
        { concept: demoConcept.trim(), level: demoLevel },
        authHeaders,
      );
      const out = data?.output || data || {};
      setDemoResult({
        title: out.title || demoConcept.trim(),
        highLevel: out.highLevel || out.summary || "No high-level output returned.",
        deepLevel: out.deepLevel || (Array.isArray(out.key_points) ? out.key_points.join(" ") : "No deep-level output returned."),
        realWorldExample: out.realWorldExample || "Try integrating this concept in your current app flow.",
        practiceSuggestion: out.practiceSuggestion || "Implement one endpoint and one UI screen for this concept.",
      });
    } catch (err) {
      setDemoError(err.message || "Failed to run demo.");
    } finally {
      setDemoLoading(false);
    }
  };

  const walkthroughItems = useMemo(() => content?.walkthrough || [], [content?.walkthrough]);
  const keyTakeaways = useMemo(() => content?.keyTakeaways || [], [content?.keyTakeaways]);

  return (
    <Stack spacing={2}>
      <Button
        component={RouterLink}
        to={topic?.moduleId ? `/learning/modules/${topic.moduleId}` : "/learning/courses"}
        variant="text"
        sx={{ alignSelf: "start", px: 0 }}
      >
        Back to Module
      </Button>

      {loading ? <LoadingState label="Loading topic detail..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={load} /> : null}

      {!loading && !error && topic ? (
        <>
          <Stack spacing={0.75}>
            <Typography variant="h4" fontWeight={700}>
              {topic.title}
            </Typography>
            <Typography color="text.secondary">{topic.shortDescription}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip size="small" label={`Topic ${topic.order}`} />
              <Chip size="small" variant="outlined" label={`${topic.estimatedMinutes || "-"} min`} />
            </Stack>
          </Stack>

          {content ? (
            <>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    High level explanation
                  </Typography>
                  <Typography variant="body2">{content.highLevelConcept}</Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Deep explanation
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {content.deepConcept}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Walkthrough
                  </Typography>
                  <List dense>
                    {walkthroughItems.map((step, index) => (
                      <ListItem key={`${index}-${step}`}>
                        <ListItemText primary={`${index + 1}. ${step}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ display: "grid", gap: 1 }}>
                  <Typography variant="h6">Demo with real use case</Typography>
                  <Typography variant="subtitle1">{content.demo?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Problem: {content.demo?.problem}
                  </Typography>
                  <Typography variant="body2">
                    {content.demo?.solutionSummary}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2">Try it live</Typography>
                  <TextField
                    label="Concept"
                    value={demoConcept}
                    onChange={(e) => setDemoConcept(e.target.value)}
                    placeholder="e.g. REST API, JWT, Vector Embeddings"
                    size="small"
                  />
                  <TextField
                    select
                    label="Level"
                    value={demoLevel}
                    onChange={(e) => setDemoLevel(e.target.value)}
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </TextField>
                  <Button
                    variant="contained"
                    onClick={handleRunDemo}
                    disabled={demoLoading || !demoConcept.trim()}
                    sx={{ justifySelf: "start" }}
                  >
                    {demoLoading ? "Generating..." : "Run AI Concept Explainer"}
                  </Button>
                  {demoError ? <Alert severity="error">{demoError}</Alert> : null}
                  {demoResult ? (
                    <Card variant="outlined">
                      <CardContent sx={{ display: "grid", gap: 0.75 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {demoResult.title}
                        </Typography>
                        <Typography variant="body2">
                          <strong>High level:</strong> {demoResult.highLevel}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Deep level:</strong> {demoResult.deepLevel}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Real world example:</strong> {demoResult.realWorldExample}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Practice suggestion:</strong> {demoResult.practiceSuggestion}
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : null}
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ display: "grid", gap: 1 }}>
                  <Typography variant="h6">Developer manual</Typography>
                  <Typography variant="body2">Goal: {content.developerManual?.goal}</Typography>
                  <List dense>
                    {(content.developerManual?.backendFlow || []).map((item, index) => (
                      <ListItem key={`${index}-${item}`}>
                        <ListItemText primary={`${index + 1}. ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ display: "grid", gap: 1 }}>
                  <Typography variant="h6">Practice use case</Typography>
                  <Typography variant="subtitle1">{content.practiceUseCase?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Problem: {content.practiceUseCase?.problem}
                  </Typography>
                  <Typography variant="body2">
                    Practice goal: {content.practiceUseCase?.practiceGoal}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Key takeaways
                  </Typography>
                  <List dense>
                    {keyTakeaways.map((item, index) => (
                      <ListItem key={`${index}-${item}`}>
                        <ListItemText primary={`- ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </>
          ) : (
            <Alert severity="info">No topic content published yet.</Alert>
          )}

          <Divider />

          {gate?.mcqUnlocked ? (
            <McqForm
              mcqs={mcqs}
              submitting={mcqSubmitting}
              onSubmit={handleSubmitMcq}
              result={mcqResult}
            />
          ) : (
            <LockedSection
              title="MCQ locked"
              reason="MCQ unlocks after this topic is marked as viewed."
            />
          )}

          {gate?.subjectiveUnlocked ? (
            <SubjectiveForm
              questions={subjectives}
              submitting={subjectiveSubmitting}
              submitted={subjectiveSubmitted}
              onSubmit={handleSubmitSubjectives}
            />
          ) : (
            <LockedSection
              title="Subjective locked"
              reason="Subjective section unlocks only after you pass the MCQ."
            />
          )}
        </>
      ) : null}
    </Stack>
  );
}

