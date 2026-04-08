import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Stack, Typography } from "@mui/material";

export default function LockedSection({ title, reason }) {
  return (
    <Alert severity="warning" icon={<LockOutlinedIcon fontSize="inherit" />}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="body2">{reason}</Typography>
      </Stack>
    </Alert>
  );
}

