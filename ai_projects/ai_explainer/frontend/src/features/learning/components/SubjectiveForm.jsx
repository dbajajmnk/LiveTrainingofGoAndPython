import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function SubjectiveForm({ questions, onSubmit, submitting = false, submitted }) {
  const [answers, setAnswers] = useState({});
  const allAnswered = useMemo(
    () => questions.every((q) => (answers[q.id] || "").trim().length > 0),
    [answers, questions],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: (answers[q.id] || "").trim(),
      })),
    };
    onSubmit(payload);
  };

  return (
    <Card>
      <CardContent component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <Typography variant="h6">Subjective Practice</Typography>
        {questions.map((q) => (
          <Stack key={q.id} spacing={0.75}>
            <Typography variant="subtitle1">{q.order}. {q.question}</Typography>
            <TextField
              multiline
              minRows={3}
              placeholder="Write your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            />
          </Stack>
        ))}
        <Button type="submit" variant="contained" disabled={submitting || !allAnswered}>
          {submitting ? "Submitting..." : "Submit Subjective Answers"}
        </Button>
        {submitted ? (
          <Typography variant="body2" color="success.main">
            Answers submitted successfully.
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

