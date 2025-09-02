import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

function MediaCard({ item, action, actionLabel }) {
  const theme = useTheme();
  const isRemove = actionLabel.toLowerCase().includes("remove");

  // Use high resolution artwork
  const highResArtwork = item.artworkUrl100
    ? item.artworkUrl100.replace("100x100bb", "600x600bb")
    : "";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        bgcolor:
          theme.palette.mode === "dark" ? "grey.900" : "background.paper",
        color: "text.primary",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 12px rgba(255,255,255,0.1)"
            : "0px 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 8px 20px rgba(255,255,255,0.2)"
              : "0px 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Album Artwork */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CardMedia
          component="img"
          image={highResArtwork}
          alt={item.collectionName}
          sx={{
            height: 200,
            borderRadius: 3,
            objectFit: "cover",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(255,255,255,0.1)"
                : "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* Text Content */}
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Tooltip title={item.collectionName} arrow>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            noWrap
            sx={{ fontWeight: 600 }}
            color="text.primary"
          >
            {item.collectionName}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" noWrap>
          {item.artistName}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          {new Date(item.releaseDate).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Action Button */}
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant={isRemove ? "outlined" : "contained"}
          color={isRemove ? "error" : "primary"}
          fullWidth
          onClick={action}
          startIcon={isRemove ? <DeleteIcon /> : <FavoriteIcon />}
          sx={{
            minHeight: 42,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "25px",
          }}
        >
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
