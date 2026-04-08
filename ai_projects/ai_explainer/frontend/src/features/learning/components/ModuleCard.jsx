import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ModuleCard({ module, mode = "list" }) {
  const to =
    mode === "topics"
      ? `/learning/topics/${module.id}`
      : `/learning/modules/${module.id}`;

  const cta = mode === "topics" ? "Open Topic" : "Open Module";

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "grid", gap: 1.25 }}>
        <Typography variant="overline" color="text.secondary">
          Module {module.order}
        </Typography>
        <Typography variant="h6">{module.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {module.shortDescription}
        </Typography>
        <Stack direction="row" spacing={2}>
          {module.estimatedHours ? (
            <Typography variant="caption" color="text.secondary">
              {module.estimatedHours} hrs
            </Typography>
          ) : null}
          {module.topicCount !== undefined ? (
            <Typography variant="caption" color="text.secondary">
              {module.topicCount} topics
            </Typography>
          ) : null}
        </Stack>
        <Button
          component={RouterLink}
          to={to}
          endIcon={<ArrowForwardIcon />}
          variant="outlined"
          sx={{ justifySelf: "start", mt: 1 }}
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

