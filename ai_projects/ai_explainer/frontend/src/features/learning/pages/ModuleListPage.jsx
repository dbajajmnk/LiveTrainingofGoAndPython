import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getCourse, listModules } from "../api/learningApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import ModuleCard from "../components/ModuleCard";

export default function ModuleListPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [courseData, moduleData] = await Promise.all([
        getCourse(courseId),
        listModules(courseId),
      ]);
      setCourse(courseData);
      setModules(Array.isArray(moduleData) ? moduleData : []);
    } catch (err) {
      setError(err.message || "Failed to load modules.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/learning/courses" variant="text" sx={{ alignSelf: "start", px: 0 }}>
        Back to Courses
      </Button>
      <Typography variant="h4" fontWeight={700}>
        Modules
      </Typography>
      <Typography color="text.secondary">
        {course ? course.title : "Course"} - choose a module.
      </Typography>

      {loading ? <LoadingState label="Loading modules..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={load} /> : null}
      {!loading && !error && modules.length === 0 ? (
        <EmptyState message="No modules published for this course." />
      ) : null}

      {!loading && !error && modules.length > 0 ? (
        <Grid container spacing={2}>
          {modules.map((module) => (
            <Grid key={module.id} size={{ xs: 12, md: 6 }}>
              <ModuleCard module={module} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
}

