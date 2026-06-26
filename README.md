# JWT Auth + CRUD API

## Authentication & Authorization

### Authentication Features

* User Registration
* User Login
* User Logout
* Access Token Generation
* Refresh Token Generation
* Refresh Token Validation
* Protected Routes using JWT
* Cookie-based Refresh Token Storage

### Authentication Endpoints

#### Register User

```http
POST /auth/register
```

#### Login User

```http
POST /auth/login
```

#### Refresh Access Token

```http
POST /auth/refresh
```

#### Logout User

```http
POST /auth/logout
```

### Authentication Flow

1. User registers an account.
2. User logs in with valid credentials.
3. Server generates an Access Token and Refresh Token.
4. Access Token is used to access protected routes.
5. Refresh Token is stored and used to generate new Access Tokens.
6. User logs out and the refresh token is invalidated.

## Task API

### Overview

The Tasks API demonstrates role-based access control using JWT authentication.

### Features

* Get All Tasks 
* Create Task
* Update Task
* Delete Task
* Protected Routes
* Role-Based Authorization

### API Endpoints

#### Get All Tasks

```http
GET /task
```
Access: User, Admin

#### Get Task By Id only if that user created it
```http
GET /task/:id
```

#### Get All tasks with filtration date, status

```http
GET /task/status=PENDING&date=07-15-2026
```

#### Get All tasks with pagination 

```http
GET /task/page=1&limit=5
```

#### Get All Tasks with Searching By title and content

```http
GET /task/search=demo
```

#### Get All Tasks with Sorting By anything and Order ASC or DESC

```http
GET /task/sortBy=createdAt&order=ASC
```

#### Create Task

```http
POST /task
```

Access: User, Admin

#### Update Task

```http
PUT /task/:id
```

Access: User, Admin

#### Delete Task

```http
DELETE /task/:id
```

Access: User, Admin


### Middleware Used

#### Authentication Middleware

Verifies JWT access tokens and authenticates users before granting access to protected routes.

#### Authorization Middleware

Controls access based on user roles and permissions.

### Error Middleware

Globally handles error that comes

### Logger Middleware
Logger is used to log Errors, info , warning all in logs/combined.log and only Error in logs/Error.log using Winston library

### Validation & Error Handling

* Input Validation
* Invalid Credentials Handling
* Invalid Token Handling
* Expired Token Handling
* Unauthorized Access Handling
* Forbidden Access Handling
* Centralized Error Handling Middleware
* Proper HTTP Status Codes and Error Messages

### Database Integration

* PostgreSQL Database Connection Using Prisma and pg
* User Data Storage
* Token Storage
* CRUD Operations for tasks
* Secure Database Queries

### Testing

All APIs were tested using Postman:

* Register User
* Login User
* Refresh Token
* Logout User
* Get Tasks
* Create Task
* Update Task
* Delete Task
* Authentication and Authorization Scenarios