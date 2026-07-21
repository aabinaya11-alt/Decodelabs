# Backend API Development

A RESTful API built with **Node.js**, **Express.js**, and **JSON file storage**, demonstrating clean architecture, CRUD operations, input validation, centralized error handling, and REST best practices.

---

## 📋 Project Overview

This project implements a full CRUD (Create, Read, Update, Delete) REST API for managing **items**. It uses a JSON file (`data/items.json`) as a lightweight, temporary database — no external database (MongoDB/MySQL) is required.

**Key Features:**
- ✅ RESTful API design following REST principles
- ✅ Full CRUD operations (GET, POST, PUT, DELETE)
- ✅ Modular, layered architecture (routes → controllers → models → middleware → utils)
- ✅ Centralized input validation with meaningful error messages
- ✅ Centralized error handling middleware
- ✅ Consistent JSON response format (success/error envelope)
- ✅ Proper HTTP status codes
- ✅ Environment variable configuration via `dotenv`
- ✅ CORS enabled
- ✅ Hot-reload development via `nodemon`
- ✅ Query-based filtering (`?category=` and `?status=`)

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework / routing |
| JSON file (`data/items.json`) | Temporary data storage |
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing |
| nodemon | Auto-restart during development |

---

## 📁 Folder Structure

```
backend-api/
│
├── server.js                # Application entry point
├── package.json              # Dependencies and scripts
├── .env                       # Environment variables (PORT, NODE_ENV)
├── .env.example               # Example env file
│
├── routes/
│   ├── index.js               # Aggregates all API routes + health check
│   └── itemRoutes.js          # /api/items endpoint definitions
│
├── controllers/
│   └── itemController.js      # Business logic for CRUD operations
│
├── models/
│   └── itemModel.js           # Item data structure / factory
│
├── middleware/
│   ├── validateItem.js        # Input validation middleware
│   ├── errorHandler.js        # Centralized error + 404 handling
│   └── asyncHandler.js        # Wraps async controllers, forwards errors
│
├── utils/
│   ├── fileHandler.js         # Read/write JSON data file
│   ├── responseHandler.js     # Standardized success/error JSON responses
│   └── idGenerator.js         # Unique ID generation
│
├── data/
│   └── items.json             # JSON "database" file
│
└── README.md
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `routes/` | Defines API endpoints and maps them to controllers |
| `controllers/` | Contains business logic for handling requests |
| `models/` | Defines the shape/structure of the data |
| `middleware/` | Validation logic and centralized error handling |
| `utils/` | Reusable helper functions (file I/O, responses, IDs) |
| `data/` | JSON file acting as the temporary database |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm

### Steps

1. **Extract / clone the project**, then navigate into it:
   ```bash
   cd backend-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   The project already includes a `.env` file. You may adjust it if needed:
   ```
   PORT=5000
   NODE_ENV=development
   ```

4. **Run the server:**

   Production mode:
   ```bash
   npm start
   ```

   Development mode (auto-restart on file changes via nodemon):
   ```bash
   npm run dev
   ```

5. **Verify it's running:**
   Open your browser or Postman and visit:
   ```
   http://localhost:5000
   ```
   You should see a welcome JSON response.

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Get all items (supports `?category=` & `?status=` filters) |
| GET | `/api/items/:id` | Get a single item by ID |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Delete an item |

### Data Structure — Item

```json
{
  "id": "a1b2c3d4",
  "title": "Sample Item One",
  "description": "This is a sample item.",
  "category": "General",
  "status": "active",
  "createdAt": "2026-01-01T10:00:00.000Z"
}
```

- `status` must be one of: `active`, `inactive`
- `title`, `description`, `category`, `status` are all required on creation and cannot be empty

---

## 🧪 Example Requests & Responses (Postman-ready)

### 1. Get All Items
**GET** `/api/items`

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4",
      "title": "Sample Item One",
      "description": "This is the first sample item used to demonstrate the API.",
      "category": "General",
      "status": "active",
      "createdAt": "2026-01-01T10:00:00.000Z"
    }
  ]
}
```

You can also filter results:
```
GET /api/items?category=General
GET /api/items?status=active
GET /api/items?category=General&status=active
```

---

### 2. Get Single Item
**GET** `/api/items/a1b2c3d4`

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Item retrieved successfully",
  "data": {
    "id": "a1b2c3d4",
    "title": "Sample Item One",
    "description": "This is the first sample item used to demonstrate the API.",
    "category": "General",
    "status": "active",
    "createdAt": "2026-01-01T10:00:00.000Z"
  }
}
```

**Response — 404 Not Found** (invalid/nonexistent ID)
```json
{
  "success": false,
  "message": "Item with id 'xyz123' was not found"
}
```

---

### 3. Create Item
**POST** `/api/items`
**Headers:** `Content-Type: application/json`

**Request Body**
```json
{
  "title": "New Laptop",
  "description": "A 15-inch laptop with 16GB RAM",
  "category": "Electronics",
  "status": "active"
}
```

**Response — 201 Created**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": "3d784355cb0f",
    "title": "New Laptop",
    "description": "A 15-inch laptop with 16GB RAM",
    "category": "Electronics",
    "status": "active",
    "createdAt": "2026-07-21T11:01:57.483Z"
  }
}
```

**Response — 400 Bad Request** (missing/empty fields)
```json
{
  "success": false,
  "message": "title is required and cannot be empty; description is required and cannot be empty"
}
```

**Response — 400 Bad Request** (invalid status)
```json
{
  "success": false,
  "message": "status must be one of: active, inactive"
}
```

---

### 4. Update Item
**PUT** `/api/items/3d784355cb0f`
**Headers:** `Content-Type: application/json`

**Request Body** (partial updates supported — only send fields you want to change)
```json
{
  "status": "inactive"
}
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": "3d784355cb0f",
    "title": "New Laptop",
    "description": "A 15-inch laptop with 16GB RAM",
    "category": "Electronics",
    "status": "inactive",
    "createdAt": "2026-07-21T11:01:57.483Z"
  }
}
```

**Response — 404 Not Found**
```json
{
  "success": false,
  "message": "Item with id 'ffffffff' was not found"
}
```

**Response — 400 Bad Request** (empty body)
```json
{
  "success": false,
  "message": "Request body cannot be empty. Provide at least one field to update"
}
```

---

### 5. Delete Item
**DELETE** `/api/items/3d784355cb0f`

**Response — 204 No Content**
*(no response body is returned, as per REST convention)*

**Response — 404 Not Found**
```json
{
  "success": false,
  "message": "Item with id '3d784355cb0f' was not found"
}
```

---

### 6. Invalid Route
**GET** `/api/does-not-exist`

**Response — 404 Not Found**
```json
{
  "success": false,
  "message": "Route not found: GET /api/does-not-exist"
}
```

---

## 🔢 HTTP Status Codes Used

| Code | Meaning | Used When |
|---|---|---|
| 200 | OK | Successful GET/PUT requests |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation errors, empty/invalid fields |
| 401 | Unauthorized | Reserved for future authentication support |
| 403 | Forbidden | Reserved for future authorization support |
| 404 | Not Found | Item ID not found, or invalid route |
| 500 | Internal Server Error | Unexpected server-side errors |

---

## 📦 Standard Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🧵 Error Handling

- All routes are wrapped with an `asyncHandler` utility so any thrown/rejected error is automatically forwarded to Express's error pipeline.
- A **centralized error handling middleware** (`middleware/errorHandler.js`) catches all errors and returns a consistent JSON error response.
- A dedicated **404 handler** catches requests to undefined routes.
- Validation errors are caught early via middleware (`middleware/validateItem.js`) before reaching the controller logic.

---

## 🧪 Testing with Postman

1. Import the base URL `http://localhost:5000/api` as a Postman environment variable (e.g. `{{baseUrl}}`).
2. Create a Postman Collection with the following requests:
   - `GET {{baseUrl}}/items`
   - `GET {{baseUrl}}/items/:id`
   - `POST {{baseUrl}}/items` (set body to `raw` → `JSON`, use the example body above)
   - `PUT {{baseUrl}}/items/:id` (raw JSON body)
   - `DELETE {{baseUrl}}/items/:id`
3. For POST/PUT, remember to set the header `Content-Type: application/json`.
4. Try invalid inputs (empty title, invalid status, nonexistent ID) to see validation and error handling in action.

You can also test quickly via `curl`:

```bash
# Get all items
curl http://localhost:5000/api/items

# Get single item
curl http://localhost:5000/api/items/a1b2c3d4

# Create item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"New Laptop","description":"A 15-inch laptop","category":"Electronics","status":"active"}'

# Update item
curl -X PUT http://localhost:5000/api/items/<id> \
  -H "Content-Type: application/json" \
  -d '{"status":"inactive"}'

# Delete item
curl -X DELETE http://localhost:5000/api/items/<id>
```

---

## 📝 Coding Standards Followed

- `async/await` used throughout for all asynchronous operations
- Modular functions with a single responsibility
- Descriptive variable and function naming
- Inline comments explaining important logic
- Consistent JSON response envelope across all endpoints
- Separation of concerns: routing, business logic, validation, and data access are all isolated into their own layers

---

## 🚀 Future Enhancements (Not Implemented, Reserved)

- Authentication & Authorization (JWT) — would use the reserved `401 Unauthorized` / `403 Forbidden` status codes
- Pagination on `GET /api/items`
- Swap JSON file storage for MongoDB/MySQL
- Automated tests (Jest / Supertest)
- Request rate limiting

---

## 📄 License

MIT
