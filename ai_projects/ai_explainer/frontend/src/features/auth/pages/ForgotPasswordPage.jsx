import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await forgotPassword({ email });
      setMessage(`${data.message} ${data.reset_hint}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, bgcolor: "grey.100" }}>
      <Paper sx={{ p: 3, width: "100%", maxWidth: 420 }} elevation={2}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Forgot password
        </Typography>
        <Typography color="text.secondary" mb={2}>
          This demo simulates a reset flow for learning.
        </Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Submitting..." : "Send reset instructions"}
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Link component={RouterLink} to="/login" underline="hover">
            Back to login
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}
