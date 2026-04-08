import { Button, Card, CardContent, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function McqForm({ mcqs, onSubmit, submitting = false, result }) {
  const [answers, setAnswers] = useState({});

  const allAnswered = useMemo(
    () => mcqs.every((q) => typeof answers[q.id] === "string" && answers[q.id].length > 0),
    [answers, mcqs],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      answers: mcqs.map((q) => ({
        mcqId: q.id,
        selectedOption: answers[q.id] || "",
      })),
    });
  };

  return (
    <Card>
      <CardContent component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <Typography variant="h6">MCQ Assessment</Typography>
        {mcqs.map((q) => (
          <Stack key={q.id} spacing={1}>
            <Typography variant="subtitle1">{q.order}. {q.question}</Typography>
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            >
              {q.options.map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </Stack>
        ))}
        <Button type="submit" variant="contained" disabled={!allAnswered || submitting}>
          {submitting ? "Submitting..." : "Submit MCQ"}
        </Button>
        {result ? (
          <Typography variant="body2" color={result.isPassed ? "success.main" : "warning.main"}>
            Score: {(result.score * 100).toFixed(0)}% ({result.isPassed ? "Passed" : "Not passed yet"})
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

