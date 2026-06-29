# API Endpoints

This document lists the available API endpoints in the project and explains what each endpoint does, what it expects, and how it is protected.

## Authentication Endpoints

### 1. Register User

**Method:** `POST`  
**Route:** `/auth/register`  
**Purpose:** Creates a new user account.

**Request Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

**Validation:**
- `name` must be at least 3 characters long
- `email` must be a valid email address
- `password` must be at least 6 characters long

**Response:**
- Returns the created user details
- Password is never returned in the response

---

### 2. Login User

**Method:** `POST`  
**Route:** `/auth/login`  
**Purpose:** Authenticates a user and generates access and refresh tokens.

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**
- Returns an access token and a refresh token
- Tokens are also stored in HTTP-only cookies

**Notes:**
- Invalid credentials return an unauthorized error
- This endpoint is the start of the protected authentication flow

---

### 3. Refresh Access Token

**Method:** `POST`  
**Route:** `/auth/refresh`  
**Purpose:** Generates a new access token using the refresh token.

**Request Body:** None

**Token Source:**
- Refresh token is read from the HTTP-only cookie

**Response:**
- Returns a new access token
- Updates the access token cookie

**Notes:**
- If the refresh token is missing or invalid, the request is rejected
- This endpoint is used when the access token expires

---

### 4. Logout User

**Method:** `POST`  
**Route:** `/auth/logout`  
**Purpose:** Logs the user out and clears stored tokens.

**Request Body:** None

**Token Source:**
- Refresh token is read from the HTTP-only cookie

**Response:**
- Clears access and refresh token cookies
- Removes token data from storage

**Notes:**
- After logout, the refresh token can no longer be used

## Task Endpoints

All task endpoints are protected and require a valid access token in the cookie.  
Only authenticated users with the proper role can access these routes.

### 1. Get All Tasks

**Method:** `GET`  
**Route:** `/task`  
**Purpose:** Returns all tasks belonging to the logged-in user.

**Access:** `USER`, `ADMIN`

**Query Parameters:**
- `status` - filter by task status such as `PENDING` or `COMPLETED`
- `date` - filter tasks created on or after a date
- `page` - pagination page number
- `limit` - number of records per page
- `search` - search in task title and content
- `sortBy` - field used for sorting
- `order` - sort order, `ASC` or `DESC`

**Examples:**
```http
GET /task?status=PENDING
GET /task?page=1&limit=5
GET /task?search=demo
GET /task?sortBy=createdAt&order=ASC
```

**Response:**
- Returns a list of the current user's tasks
- Pagination metadata may also be included

---

### 2. Get Task By Id

**Method:** `GET`  
**Route:** `/task/:id`  
**Purpose:** Returns a single task by its ID.

**Access:** `USER`, `ADMIN`

**Route Parameter:**
- `id` - numeric task ID

**Important Rule:**
- The user can only fetch the task if they created it

**Example:**
```http
GET /task/1
```

**Response:**
- Returns the task details if the task belongs to the logged-in user
- Returns not found or unauthorized response otherwise

---

### 3. Create Task

**Method:** `POST`  
**Route:** `/task`  
**Purpose:** Creates a new task for the logged-in user.

**Access:** `USER`, `ADMIN`

**Request Body:**
```json
{
  "title": "Demo Task",
  "content": "This is a sample task content"
}
```

**Validation:**
- `title` must be at least 3 characters long
- `content` must be at least 5 characters long

**Response:**
- Returns the created task data
- `status` is set automatically, usually to `PENDING`
- `createdAt` and `updatedAt` are generated automatically

---

### 4. Update Task

**Method:** `PUT`  
**Route:** `/task/:id`  
**Purpose:** Updates an existing task owned by the logged-in user.

**Access:** `USER`, `ADMIN`

**Route Parameter:**
- `id` - numeric task ID

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "content": "Updated task content"
}
```

**Important Rule:**
- The task must belong to the logged-in user
- Users cannot update another user's task

**Response:**
- Returns success message and updated task information

---

### 5. Delete Task

**Method:** `DELETE`  
**Route:** `/task/:id`  
**Purpose:** Deletes a task owned by the logged-in user.

**Access:** `USER`, `ADMIN`

**Route Parameter:**
- `id` - numeric task ID

**Important Rule:**
- The task must belong to the logged-in user
- Users cannot delete another user's task

**Response:**
- Returns a success message when the task is deleted

## Authentication and Authorization Rules

- Authentication is handled using JWT access tokens
- Access tokens are stored in HTTP-only cookies
- Refresh tokens are stored in HTTP-only cookies
- Task routes require authentication
- Role-based authorization is applied to allow `USER` and `ADMIN`
- Users can only access their own tasks

## Error Cases

Common error cases handled by these endpoints include:
- Missing token
- Invalid token
- Expired token
- Invalid credentials
- Validation failure
- Unauthorized access
- Forbidden access
- Task not found

## Notes

- Route paths are based on the Express router setup in the project
- Query-based task filtering is handled inside the task service logic
- `createdAt` and `updatedAt` are managed automatically by Prisma
