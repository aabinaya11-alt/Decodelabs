const crypto = require("crypto");

/**
 * Generates a unique, URL-safe ID for a new item.
 * Uses Node's built-in crypto module so no external dependency is required.
 * @returns {string} unique identifier
 */
const generateId = () => {
  return crypto.randomBytes(6).toString("hex");
};

module.exports = { generateId };
