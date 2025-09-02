import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function Header({ mode, toggleTheme }) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box display="flex" alignItems="center">
          <AppleIcon sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            iTunes
          </Typography>
        </Box>

        {/* Center: Title */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", flexGrow: 1 }}
        >
          iTunes Search Engine
        </Typography>

        {/* Right: Theme toggle */}
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
