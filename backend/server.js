import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import itunesRoutes from "./routes/itunesRoutes.js";

dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());

// Handle malformed JSON errors gracefully
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON:", err.message);
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }

  next();
});

// Generate JWT token
app.get("/api/token", (req, res) => {
  const token = jwt.sign({ user: "guest" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// Protected iTunes search route
app.use("/api", itunesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
