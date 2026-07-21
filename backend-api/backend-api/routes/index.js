const express = require("express");
const router = express.Router();

const itemRoutes = require("./itemRoutes");

// Health check endpoint - useful for uptime monitoring / sanity checks
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is up and running",
    data: { timestamp: new Date().toISOString() },
  });
});

// Mount resource routes
router.use("/items", itemRoutes);

module.exports = router;
