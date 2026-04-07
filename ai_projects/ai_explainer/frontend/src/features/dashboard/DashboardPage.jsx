import InsightsIcon from "@mui/icons-material/Insights";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { apiClient } from "../../services/apiClient";

const cards = [
  { title: "Auth + JWT", icon: <SecurityIcon color="primary" />, desc: "Learn protected routes and tokens." },
  { title: "OpenAI APIs", icon: <SmartToyIcon color="primary" />, desc: "Test chat, image, embeddings, moderation." },
  { title: "MongoDB", icon: <InsightsIcon color="primary" />, desc: "Persist users and build app-ready backend." },
];

export default function DashboardPage() {
  const { user, authHeaders } = useAuth();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    apiClient
      .request("/api/dashboard", { headers: authHeaders })
      .then(setDashboard)
      .catch(() => setDashboard(null));
  }, [authHeaders]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        Hi {user?.name || "Student"}!
      </Typography>
      <Typography color="text.secondary">
        This project follows modular architecture, DRY/KISS patterns, and API-first design.
      </Typography>
      {dashboard?.welcome && (
        <Card>
          <CardContent>
            <Typography variant="h6">{dashboard.welcome}</Typography>
            {dashboard.tips?.map((tip) => (
              <Typography key={tip} color="text.secondary">
                - {tip}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
      <Grid container spacing={2}>
        {cards.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  {item.icon}
                  <Typography variant="h6">{item.title}</Typography>
                </Stack>
                <Typography color="text.secondary">{item.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
