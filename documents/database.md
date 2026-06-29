# Database Documentation

This document describes the database structure used in the JWT Auth + CRUD API project.

## Database Overview

The project uses:

- PostgreSQL as the database
- Prisma ORM for database modeling and queries
- `pg` for direct PostgreSQL access where needed

The database stores users, tasks, and token information for authentication.

## Schema Summary

### 1. User Model

Stores user account information.

**Fields:**
- `id` - Primary key, auto-incremented integer
- `name` - User name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role, default is `USER`
- `createdAt` - Automatically generated creation timestamp
- `updatedAt` - Automatically updated timestamp

**Relations:**
- One user can have many tasks
- One user can have one token storage record

---

### 2. Task Model

Stores task data created by users.

**Fields:**
- `id` - Primary key, auto-incremented integer
- `title` - Task title
- `content` - Task description/content
- `status` - Task status, default is `PENDING`
- `userId` - Foreign key linked to the user
- `createdAt` - Automatically generated creation timestamp
- `updatedAt` - Automatically updated timestamp

**Relations:**
- Each task belongs to one user

**Access Rules:**
- Users can only view, update, or delete their own tasks
- Tasks are protected by authentication and authorization middleware

---

### 3. TokenStorage Model

Stores access and refresh token data for users.

**Fields:**
- `id` - Primary key, auto-incremented integer
- `userId` - Unique foreign key linked to the user
- `accessToken` - Stored access token
- `accessCreatedAt` - Access token creation timestamp
- `accessExpiredAt` - Access token expiry timestamp
- `refreshToken` - Stored refresh token
- `refreshCreatedAt` - Refresh token creation timestamp
- `refreshExpiredAt` - Refresh token expiry timestamp

**Relations:**
- Each token storage record belongs to one user

---

## Enums

### Role
Used to manage user authorization.

```prisma
enum Role {
  USER
  ADMIN
}