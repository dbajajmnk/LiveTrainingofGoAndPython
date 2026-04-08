import { Alert } from "@mui/material";

export default function EmptyState({ message = "No data available yet." }) {
  return <Alert severity="info">{message}</Alert>;
}

