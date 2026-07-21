// Load environment variables from .env as early as possible
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/index");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Global Middleware ----------
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Simple request logger (helpful during development)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- Root Route ----------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Backend API Development project",
    data: {
      docs: "See README.md for full API documentation",
      health: "/api/health",
      items: "/api/items",
    },
  });
});

// ---------- API Routes ----------
app.use("/api", apiRoutes);

// ---------- 404 Handler ----------
// Catches any request that didn't match a route above
app.use(notFoundHandler);

// ---------- Centralized Error Handler ----------
// Must be the LAST piece of middleware registered
app.use(errorHandler);

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to verify the API is running`);
});

module.exports = app;
