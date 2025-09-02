import express from "express";
import axios from "axios";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get /api/search
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { term, media = "all" } = req.query;

    // if no term provided, send 400
    if (!term || term.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    // Call iTunes Search API
    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term, media, limit: 20 },
    });

    // Ensure results is always an array
    const items = Array.isArray(response.data.results)
      ? response.data.results
      : [];

    // Transform API results into simplified format
    const results = items.map((item) => ({
      trackId: item.trackId || item.collectionId || null,
      artistName: item.artistName || "Unknown Artist",
      collectionName: item.collectionName || item.trackName || "Untitled",
      artworkUrl100: item.artworkUrl100 || "",
      releaseDate: item.releaseDate || null,
      kind: item.kind || item.wrapperType || "unknown",
    }));

    //  Return unfiltered results
    res.json(results);
  } catch (error) {
    console.error("iTunes search failed:", error.message);

    // Handle axios-specific errors for clarity
    if (error.response) {
      return res.status(error.response.status).json({
        error: `iTunes API responded with status ${error.response.status}`,
      });
    }

    res.status(500).json({ error: "Failed to fetch from iTunes API" });
  }
});

export default router;
