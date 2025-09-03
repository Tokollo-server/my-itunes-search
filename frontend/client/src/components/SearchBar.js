import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch }) {
  // State for search term (user input)
  const [term, setTerm] = useState("");
  // State for media type filter
  const [media, setMedia] = useState("all");
  // Access current MUI theme for styling (light/dark mode)
  const theme = useTheme();

  // Handle form submit, call onSearch() from parent with search params
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term, media);
  };

  return (
    // Form container
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/*  Search Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search..."
            variant="outlined"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </Grid>

        {/*  Media Select Dropdown */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="media-select-label">Media Type</InputLabel>
            <Select
              labelId="media-select-label"
              value={media}
              label="Media Type"
              onChange={(e) => setMedia(e.target.value)}
              sx={{
                borderRadius: "30px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="podcast">Podcast</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="audiobook">Audiobook</MenuItem>
              <MenuItem value="shortFilm">Short Film</MenuItem>
              <MenuItem value="tvShow">TV Show</MenuItem>
              <MenuItem value="software">Software</MenuItem>
              <MenuItem value="ebook">Ebook</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/*  Search Button */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: 150,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                boxShadow: "0px 6px 18px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchBar;
