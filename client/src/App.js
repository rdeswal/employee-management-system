import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import EmployeeManagement from "./components/EmployeeManagement";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmployeeManagement />
    </ThemeProvider>
  );
}

export default App;
