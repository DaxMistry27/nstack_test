# Request and Response Examples

This document contains sample request and response payloads for the JWT Auth + CRUD API.

All API responses follow this common format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": "Optional response data"
}
```

## 1. Register User

### Request

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Successfully Registered.",
  "data": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "role": "USER"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Email is already registered"
}
```

## 2. Login User

### Request

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login Successfully",
  "data": {
    "accessToken": "your-access-token",
    "refreshToken": "your-refresh-token"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid Credential"
}
```

## 3. Refresh Access Token

### Request

No request body is required.  
The refresh token is read from the HTTP-only cookie.

### Success Response

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "new-access-token"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Refresh token missing"
}
```

## 4. Logout User

### Request

No request body is required.  
The refresh token is read from the HTTP-only cookie.

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 5. Create Task

### Request

```json
{
  "title": "Demo Task",
  "content": "This is a sample task content",
  "status": "PENDING"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Task is Created",
  "data": {
    "id": 1,
    "title": "Demo Task",
    "content": "This is a sample task content",
    "status": "PENDING",
    "userId": 1,
    "createdAt": "2026-06-29T10:00:00.000Z",
    "updatedAt": "2026-06-29T10:00:00.000Z"
  }
}
```

## 6. Get All Tasks

### Request

No request body is required.

### Success Response

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Demo Task",
        "content": "This is a sample task content",
        "status": "PENDING",
        "userId": 1,
        "createdAt": "2026-06-29T10:00:00.000Z",
        "updatedAt": "2026-06-29T10:00:00.000Z"
      }
    ],
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 10
  }
}
```

## 7. Get Task By Id

### Request

No request body is required.

### Success Response

```json
{
  "success": true,
  "message": "Task fetched successfully",
  "data": {
    "id": 1,
    "title": "Demo Task",
    "content": "This is a sample task content",
    "status": "PENDING",
    "userId": 1,
    "createdAt": "2026-06-29T10:00:00.000Z",
    "updatedAt": "2026-06-29T10:00:00.000Z"
  }
}
```

## 8. Update Task

### Request

```json
{
  "title": "Updated Task Title",
  "content": "Updated task content",
  "status": "COMPLETED"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Task Updated",
  "data": {
    "count": 1
  }
}
```

## 9. Delete Task

### Request

No request body is required.

### Success Response

```json
{
  "success": true,
  "message": "Task Deleted",
  "data": {
    "count": 1
  }
}
```

## Notes

- HTTP-only cookies are used for token storage.
- `createdAt` and `updatedAt` are generated automatically by Prisma.
- Actual response messages may vary depending on controller implementation.
