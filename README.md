# JWT Auth + CRUD API

A Node.js and Express.js REST API for JWT authentication and task management using PostgreSQL and Prisma.

## Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* PostgreSQL running locally or on a remote server
* Prisma CLI available through the project dependencies

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add the required environment variables:

```env
NODE_ENV="development"
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:DATABASE_PORT/DATABASE_NAME"
HOST=localhost
USER=postgres
PASSWORD=your_password
DATABASE_NAME=your_database_name
DATABASE_PORT=5432
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
```

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

## Run Commands

Start the server in development mode:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm start
```

Run tests:

```bash
npm test
```

## Available Scripts

* `npm run dev` - Start the server with Nodemon
* `npm start` - Start the server with Node.js
* `npm test` - Run the test suite with Vitest
* `npm run lint` - Check code style with ESLint
* `npm run lint:fix` - Automatically fix lint issues

## Environment Variables

The project uses these environment variables:

* `PORT` - Server port
* `DATABASE_URL` - Prisma database connection string
* `HOST` - PostgreSQL host
* `USER` - PostgreSQL username
* `PASSWORD` - PostgreSQL password
* `DATABASE_NAME` - PostgreSQL database name
* `DATABASE_PORT` - PostgreSQL port
* `ACCESS_SECRET` - JWT access token secret
* `REFRESH_SECRET` - JWT refresh token secret

## Folder Structure

```text
Test/
|-- config/        Database and application configuration
|-- controller/    Handles HTTP requests and responses
|-- documents/     API documentation, examples, and Postman collection
|-- logs/          Application log files
|-- middleware/    Authentication, validation, logger, and error middleware
|-- prisma/        Prisma schema and database migrations
|-- routes/        API route definitions
|-- services/      Business logic for authentication and tasks
|-- test/          Automated test cases
|-- utils/         Shared helper functions and logger utilities
|-- validations/   Joi validation schemas
|-- .env           Local environment variables
|-- .env.example   Example environment file
|-- package.json   Project scripts and dependencies
|-- prisma.config.ts  Prisma configuration file
|-- README.md      Project setup guide
`-- server.js      Express server entry point
```

## Notes

* API feature documentation should be kept in the `documents/` folder.
* Log files in `logs/` should not be committed to Git.
