// theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f7",
              paper: "#ffffff",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    typography: {
      fontFamily: "'SF Pro Display', 'Roboto', sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
    transitions: {
      duration: {
        enteringScreen: 500,
        leavingScreen: 500,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
              color: mode === "dark" ? "#fff" : "#000",
              "& fieldset": {
                borderColor: mode === "dark" ? "#555" : "#ccc",
              },
            },
            "& .MuiInputLabel-root": {
              color: mode === "dark" ? "#bbb" : "#555",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
      },
    },
  });

export default getTheme;
