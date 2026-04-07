import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4f46e5" },
    secondary: { main: "#0ea5e9" },
    background: { default: "#f1f5f9" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
  },
});
