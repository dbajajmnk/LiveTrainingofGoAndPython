import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "grid", gap: 1.25 }}>
        <Typography variant="overline" color="text.secondary">
          Topic {topic.order}
        </Typography>
        <Typography variant="h6">{topic.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {topic.shortDescription}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Estimated {topic.estimatedMinutes || "-"} minutes
        </Typography>
        <Button
          component={RouterLink}
          to={`/learning/topics/${topic.id}`}
          endIcon={<ArrowForwardIcon />}
          variant="outlined"
          sx={{ justifySelf: "start", mt: 1 }}
        >
          Open Topic
        </Button>
      </CardContent>
    </Card>
  );
}

