import { Alert, Button, Stack } from "@mui/material";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <Stack spacing={1.5}>
      <Alert severity="error">{message}</Alert>
      {onRetry ? (
        <Button variant="outlined" onClick={onRetry} sx={{ alignSelf: "flex-start" }}>
          Retry
        </Button>
      ) : null}
    </Stack>
  );
}

