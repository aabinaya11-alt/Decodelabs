const { generateId } = require("../utils/idGenerator");

/**
 * Item Model
 * ----------
 * Represents the shape of a single "item" resource stored in our
 * JSON file database.
 *
 * Fields:
 *  - id          {string}  Unique identifier (auto-generated)
 *  - title       {string}  Short title of the item (required)
 *  - description {string}  Detailed description of the item (required)
 *  - category    {string}  Category the item belongs to (required)
 *  - status      {string}  Current status, e.g. "active" | "inactive" (required)
 *  - createdAt   {string}  ISO timestamp of when the item was created
 */
class Item {
  constructor({ title, description, category, status }) {
    this.id = generateId();
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Item;
