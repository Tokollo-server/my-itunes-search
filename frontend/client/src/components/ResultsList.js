import React from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { motion } from "framer-motion";
import MediaCard from "./MediaCard";

function ResultsList({ results, onAddFavourite }) {
  //  Ensure uniqueness using collectionId, trackId, or fallback to index
  const uniqueResults = Array.from(
    new Map(
      results.map((item, index) => [
        item.collectionId || item.trackId || `idx-${index}`, // fallback key
        item,
      ])
    ).values()
  );

  return (
    <Fade in={results.length > 0} timeout={600}>
      <div>
        {results.length > 0 && (
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "text.primary",
              borderBottom: "2px solid #e0e0e0",
              pb: 1,
            }}
          >
            Search Results
          </Typography>
        )}

        <Grid container spacing={3}>
          {uniqueResults.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={item.collectionId || item.trackId || `idx-${index}`}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              style={{ display: "flex" }}
            >
              <MediaCard
                item={item}
                action={() => onAddFavourite(item)}
                actionLabel="Add to Favourites"
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
}

export default ResultsList;
