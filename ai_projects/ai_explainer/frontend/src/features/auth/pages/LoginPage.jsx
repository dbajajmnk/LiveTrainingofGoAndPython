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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
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
          Login
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Continue to your learning dashboard.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Link component={RouterLink} to="/forgot-password" underline="hover">
            Forgot password?
          </Link>
          <Link component={RouterLink} to="/signup" underline="hover">
            Create account
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}
