# Authentication Documentation

## Overview
This project uses JWT authentication with access tokens and refresh tokens.

## Features
- User registration
- User login
- User logout
- Access token generation
- Refresh token generation
- Protected routes
- Cookie-based token storage

## Authentication Flow
1. User registers an account.
2. User logs in with valid credentials.
3. Server generates access and refresh tokens.
4. Access token is used for protected routes.
5. Refresh token is used to get a new access token.
6. User logs out and tokens are invalidated.

## Notes
- Access token is stored in an HTTP-only cookie.
- Refresh token is also stored in an HTTP-only cookie.