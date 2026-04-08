import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "grid", gap: 1.25 }}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip size="small" label={course.level || "Level"} />
          <Chip size="small" variant="outlined" label={`${course.estimatedHours ?? "-"} hrs`} />
        </Stack>
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {course.shortDescription}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {(course.tags || []).slice(0, 4).map((tag) => (
            <Chip key={tag} size="small" variant="outlined" label={tag} />
          ))}
        </Stack>
        <Button
          component={RouterLink}
          to={`/learning/courses/${course.id}/modules`}
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          sx={{ justifySelf: "start", mt: 1 }}
        >
          Start Course
        </Button>
      </CardContent>
    </Card>
  );
}

