import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <Box sx={{ py: 6, display: "grid", placeItems: "center", gap: 1.5 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

