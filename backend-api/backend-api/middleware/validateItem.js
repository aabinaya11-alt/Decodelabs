const { sendError } = require("../utils/responseHandler");

// Allowed values for the "status" field
const ALLOWED_STATUSES = ["active", "inactive"];

/**
 * Checks whether a value is a non-empty string (after trimming whitespace).
 * @param {*} value
 * @returns {boolean}
 */
const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Middleware: validates the request body when creating a new item.
 * All fields (title, description, category, status) are required.
 */
const validateCreateItem = (req, res, next) => {
  const { title, description, category, status } = req.body;
  const errors = [];

  if (!isNonEmptyString(title)) {
    errors.push("title is required and cannot be empty");
  }

  if (!isNonEmptyString(description)) {
    errors.push("description is required and cannot be empty");
  }

  if (!isNonEmptyString(category)) {
    errors.push("category is required and cannot be empty");
  }

  if (!isNonEmptyString(status)) {
    errors.push("status is required and cannot be empty");
  } else if (!ALLOWED_STATUSES.includes(status.toLowerCase())) {
    errors.push(`status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
  }

  if (errors.length > 0) {
    return sendError(res, 400, errors.join("; "));
  }

  next();
};

/**
 * Middleware: validates the request body when updating an existing item.
 * Fields are optional (partial updates allowed), but any field that IS
 * provided must not be empty and must be valid.
 */
const validateUpdateItem = (req, res, next) => {
  const { title, description, category, status } = req.body;
  const errors = [];

  if (Object.keys(req.body).length === 0) {
    return sendError(res, 400, "Request body cannot be empty. Provide at least one field to update");
  }

  if (title !== undefined && !isNonEmptyString(title)) {
    errors.push("title cannot be empty");
  }

  if (description !== undefined && !isNonEmptyString(description)) {
    errors.push("description cannot be empty");
  }

  if (category !== undefined && !isNonEmptyString(category)) {
    errors.push("category cannot be empty");
  }

  if (status !== undefined) {
    if (!isNonEmptyString(status)) {
      errors.push("status cannot be empty");
    } else if (!ALLOWED_STATUSES.includes(status.toLowerCase())) {
      errors.push(`status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
    }
  }

  if (errors.length > 0) {
    return sendError(res, 400, errors.join("; "));
  }

  next();
};

/**
 * Middleware: validates that the :id route parameter is present and
 * looks like a syntactically valid ID (non-empty string).
 */
const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!isNonEmptyString(id)) {
    return sendError(res, 400, "A valid item ID must be provided in the URL");
  }

  next();
};

module.exports = {
  validateCreateItem,
  validateUpdateItem,
  validateIdParam,
};
