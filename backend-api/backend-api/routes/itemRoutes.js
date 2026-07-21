const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");
const asyncHandler = require("../middleware/asyncHandler");
const {
  validateCreateItem,
  validateUpdateItem,
  validateIdParam,
} = require("../middleware/validateItem");

// GET /api/items -> Retrieve all items (supports ?category= & ?status= filters)
router.get("/", asyncHandler(itemController.getAllItems));

// GET /api/items/:id -> Retrieve a single item by ID
router.get("/:id", validateIdParam, asyncHandler(itemController.getItemById));

// POST /api/items -> Create a new item
router.post("/", validateCreateItem, asyncHandler(itemController.createItem));

// PUT /api/items/:id -> Update an existing item
router.put(
  "/:id",
  validateIdParam,
  validateUpdateItem,
  asyncHandler(itemController.updateItem)
);

// DELETE /api/items/:id -> Delete an item
router.delete("/:id", validateIdParam, asyncHandler(itemController.deleteItem));

module.exports = router;
