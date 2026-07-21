const fs = require("fs/promises");
const path = require("path");

// Path to our JSON "database" file
const DATA_FILE_PATH = path.join(__dirname, "..", "data", "items.json");

/**
 * Reads and parses all items from the JSON data file.
 * If the file does not exist or is empty, returns an empty array.
 * @returns {Promise<Array>} array of item objects
 */
const readItems = async () => {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");

    // Guard against an empty file causing a JSON parse error
    if (!fileContent.trim()) {
      return [];
    }

    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist yet, treat it as an empty dataset
    if (error.code === "ENOENT") {
      return [];
    }
    throw new Error(`Failed to read data file: ${error.message}`);
  }
};

/**
 * Writes the given array of items back to the JSON data file.
 * @param {Array} items - array of item objects to persist
 * @returns {Promise<void>}
 */
const writeItems = async (items) => {
  try {
    const jsonData = JSON.stringify(items, null, 2);
    await fs.writeFile(DATA_FILE_PATH, jsonData, "utf-8");
  } catch (error) {
    throw new Error(`Failed to write data file: ${error.message}`);
  }
};

module.exports = {
  readItems,
  writeItems,
};
