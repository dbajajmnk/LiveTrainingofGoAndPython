import { Grid, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { listCourses } from "../api/learningApi";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        OpenAI Learning Courses
      </Typography>
      <Typography color="text.secondary">
        Start with a course, then drill down into modules and topics.
      </Typography>

      {loading ? <LoadingState label="Loading courses..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={load} /> : null}
      {!loading && !error && courses.length === 0 ? (
        <EmptyState message="No published courses found." />
      ) : null}

      {!loading && !error && courses.length > 0 ? (
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, md: 6 }}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
}

