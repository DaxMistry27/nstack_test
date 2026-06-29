# Request and Response Examples

This document contains sample request and response payloads for the JWT Auth + CRUD API.

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
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "role": "USER"
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
  "accessToken": "your-access-token",
  "refreshToken": "your-refresh-token"
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
  "accessToken": "new-access-token"
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
  "content": "This is a sample task content"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Task created successfully",
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
  "data": [
    {
      "id": 1,
      "title": "Demo Task",
      "content": "This is a sample task content",
      "status": "PENDING",
      "userId": 1,
      "createdAt": "2026-06-29T10:00:00.000Z",
      "updatedAt": "2026-06-29T10:00:00.000Z"
    }
  ]
}
```

## 7. Update Task

### Request

```json
{
  "title": "Updated Task Title",
  "content": "Updated task content"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Task updated successfully"
}
```

## 8. Delete Task

### Request

No request body is required.

### Success Response

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Notes

- HTTP-only cookies are used for token storage.
- `createdAt` and `updatedAt` are generated automatically by Prisma.
- Actual response messages may vary depending on controller implementation.
