import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function AppShell() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <AutoAwesomeIcon />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Capability Learning Lab
          </Typography>
          <Button component={RouterLink} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={RouterLink} to="/capabilities" color="inherit">
            Capabilities
          </Button>
          <Button component={RouterLink} to="/learning/courses" color="inherit">
            Learning
          </Button>
          {user && (
            <Typography variant="body2" sx={{ display: { xs: "none", md: "block" } }}>
              {user.name}
            </Typography>
          )}
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
