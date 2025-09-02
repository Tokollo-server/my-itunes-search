import jwt from "jsonwebtoken";

/*
 This middleware protects routes by verifying the JWT (JSON Web Token)
 passed in the Authorization header of incoming requests.
 */
export const authMiddleware = (req, res, next) => {
  // Extract the "Authorization" header (format: "Bearer <token>")
  const authHeader = req.headers["authorization"];

  // If no Authorization header or it doesn't start with "Bearer", block access
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No token provided" });
  }

  // Extract the token value (after "Bearer ")
  const token = authHeader.split(" ")[1];

  // Verify the token using the secret key stored in environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token is invalid or expired → Unauthorized
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach decoded payload (user data) to request object for later use
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  });
};
