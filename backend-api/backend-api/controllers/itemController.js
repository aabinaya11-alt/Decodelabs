const { readItems, writeItems } = require("../utils/fileHandler");
const { sendSuccess, sendError } = require("../utils/responseHandler");
const Item = require("../models/itemModel");

/**
 * @route   GET /api/items
 * @desc    Retrieve all items. Supports optional filtering via
 *          query params: ?category=... and ?status=...
 * @access  Public
 */
const getAllItems = async (req, res) => {
  const items = await readItems();
  const { category, status } = req.query;

  let filteredItems = items;

  if (category) {
    filteredItems = filteredItems.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (status) {
    filteredItems = filteredItems.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }

  return sendSuccess(res, 200, "Items retrieved successfully", filteredItems);
};

/**
 * @route   GET /api/items/:id
 * @desc    Retrieve a single item by its ID
 * @access  Public
 */
const getItemById = async (req, res) => {
  const { id } = req.params;
  const items = await readItems();

  const item = items.find((currentItem) => currentItem.id === id);

  if (!item) {
    return sendError(res, 404, `Item with id '${id}' was not found`);
  }

  return sendSuccess(res, 200, "Item retrieved successfully", item);
};

/**
 * @route   POST /api/items
 * @desc    Create a new item
 * @access  Public
 */
const createItem = async (req, res) => {
  const { title, description, category, status } = req.body;
  const items = await readItems();

  const newItem = new Item({
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    status: status.trim().toLowerCase(),
  });

  items.push(newItem);
  await writeItems(items);

  return sendSuccess(res, 201, "Item created successfully", newItem);
};

/**
 * @route   PUT /api/items/:id
 * @desc    Update an existing item by its ID
 * @access  Public
 */
const updateItem = async (req, res) => {
  const { id } = req.params;
  const items = await readItems();

  const itemIndex = items.findIndex((currentItem) => currentItem.id === id);

  if (itemIndex === -1) {
    return sendError(res, 404, `Item with id '${id}' was not found`);
  }

  const { title, description, category, status } = req.body;
  const existingItem = items[itemIndex];

  // Only update fields that were actually provided (partial update support)
  const updatedItem = {
    ...existingItem,
    title: title !== undefined ? title.trim() : existingItem.title,
    description: description !== undefined ? description.trim() : existingItem.description,
    category: category !== undefined ? category.trim() : existingItem.category,
    status: status !== undefined ? status.trim().toLowerCase() : existingItem.status,
  };

  items[itemIndex] = updatedItem;
  await writeItems(items);

  return sendSuccess(res, 200, "Item updated successfully", updatedItem);
};

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete an item by its ID
 * @access  Public
 */
const deleteItem = async (req, res) => {
  const { id } = req.params;
  const items = await readItems();

  const itemIndex = items.findIndex((currentItem) => currentItem.id === id);

  if (itemIndex === -1) {
    return sendError(res, 404, `Item with id '${id}' was not found`);
  }

  items.splice(itemIndex, 1);
  await writeItems(items);

  // 204 No Content -> no response body should be sent
  return res.status(204).send();
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
