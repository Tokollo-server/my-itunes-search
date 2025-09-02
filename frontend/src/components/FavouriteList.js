import React from "react";
import { Grid, Typography, Fade, useTheme } from "@mui/material";
import MediaCard from "./MediaCard";

function FavouriteList({ favourites, onRemoveFavourite }) {
  const hasFavourites = favourites.length > 0;
  const theme = useTheme();

  return (
    <Fade in={hasFavourites} timeout={500}>
      <div>
        {hasFavourites && (
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              mb: 2,
              fontWeight: 500,
              color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
            }}
          >
            Favourites
          </Typography>
        )}

        <Grid container spacing={3}>
          {favourites.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.trackId}>
              <MediaCard
                item={item}
                action={() => onRemoveFavourite(item.trackId)}
                actionLabel="Remove"
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
}

export default FavouriteList;
