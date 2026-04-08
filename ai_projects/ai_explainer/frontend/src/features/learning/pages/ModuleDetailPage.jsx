import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getModule, listTopics } from "../api/learningApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import TopicCard from "../components/TopicCard";

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const [moduleItem, setModuleItem] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [moduleData, topicData] = await Promise.all([
        getModule(moduleId),
        listTopics(moduleId),
      ]);
      setModuleItem(moduleData);
      setTopics(Array.isArray(topicData) ? topicData : []);
    } catch (err) {
      setError(err.message || "Failed to load module details.");
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Stack spacing={2}>
      <Button
        component={RouterLink}
        to={`/learning/courses/${moduleItem?.courseId || ""}/modules`}
        variant="text"
        sx={{ alignSelf: "start", px: 0 }}
      >
        Back to Modules
      </Button>
      <Typography variant="h4" fontWeight={700}>
        {moduleItem?.title || "Module Detail"}
      </Typography>
      <Typography color="text.secondary">
        {moduleItem?.shortDescription || "Loading module information..."}
      </Typography>
      {loading ? <LoadingState label="Loading module topics..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={load} /> : null}
      {!loading && !error && topics.length === 0 ? (
        <EmptyState message="No topics published for this module." />
      ) : null}
      {!loading && !error && topics.length > 0 ? (
        <Grid container spacing={2}>
          {topics.map((topic) => (
            <Grid key={topic.id} size={{ xs: 12, md: 6 }}>
              <TopicCard topic={topic} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
}

