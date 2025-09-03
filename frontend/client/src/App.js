import React, { useState, useMemo } from "react";
import { Container, Box, Paper, ThemeProvider } from "@mui/material";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FavouriteList from "./components/FavouriteList";
import api from "./services/api";
import Header from "./components/Header";
import getTheme from "./theme";

function App() {
  // State to store search results returned from API
  const [results, setResults] = useState([]);

  // State to store user's favourite items
  const [favourites, setFavourites] = useState([]);

  // State to handle dark mode / light mode toggle
  const [mode, setMode] = useState("light");

  // Generate Material UI theme dynamically based on mode
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Call iTunes API to fetch search results by term and media type
  const handleSearch = async (term, media) => {
    const data = await api.search(term, media);
    setResults(data);
  };

  // Add selected item to favourites
  const addFavourite = (item) => {
    setFavourites([...favourites, item]);
  };

  // Remove item from favourites list by trackId
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((item) => item.trackId !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh", // make page take full height
          bgcolor: "background.default", // theme-based background color
          color: "text.primary", // theme-based text color
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.4s ease", // smooth transition when switching themes
        }}
      >
        {/* Top navigation/header with app title & theme toggle button */}
        <Header mode={mode} toggleTheme={toggleTheme} />

        {/* Main content area */}
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 5,
              p: 4, // padding inside Paper
              background: (theme) => theme.palette.background.paper, // theme aware bg
              transition: "all 0.4s ease",
              "&:hover": {
                transform: "scale(1.01)", // subtle zoom on hover
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)", // shadow effect
              },
            }}
          >
            {/* Search bar for querying iTunes API */}
            <SearchBar onSearch={handleSearch} />

            {/* Display search results with option to add to favourites */}
            <ResultsList results={results} onAddFavourite={addFavourite} />

            {/* Display user's favourite items with option to remove */}
            <FavouriteList
              favourites={favourites}
              onRemoveFavourite={removeFavourite}
            />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
