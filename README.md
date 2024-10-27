# Construction Management API

## Overview

This API provides endpoints for user authentication and password management for a construction management application. It allows users to register, log in, log out, and reset their passwords securely.

## Base URL

<http://localhost:PORT/api/auth>

> Replace `PORT` with the appropriate port number where your server is running.

## Endpoints

### 1. User Authentication

#### **POST** `/signup`

- **Description**: Register a new user.
- **Request Body**:

    ```json
    {
        "email": "string",
        "password": "string",
        "firstname": "string",
        "lastname": "string"
    }
    ```

- **Response**:
  - **Status**: 201 Created
  - **Body**:

    ```json
    {
        "responseMsg": "User registered successfully"
    }
    ```

#### **POST** `/login`

- **Description**: Log in an existing user.
- **Request Body**:

    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

- **Response**:
  - **Status**: 200 OK
  - **Body**:

    ```json
    {
        "responseMsg": "Successfully logged in"
    }
    ```

#### **POST** `/logout`

- **Description**: Log out the currently logged-in user.
- **Response**:
  - **Status**: 200 OK
  - **Body**:

    ```json
    {
        "responseMsg": "Logged out successfully"
    }
    ```

### 2. Password Management

#### **POST** `/reset-password`

- **Description**: Send a password reset link to the user's email.
- **Request Body**:

    ```json
    {
        "email": "string"
    }
    ```

- **Response**:
  - **Status**: 200 OK
  - **Body**:

    ```json
    {
        "responseMsg": "Password reset link was successfully sent to user@example.com"
    }
    ```

#### **PUT** `/reset`

- **Description**: Reset the password from link sent to user's email.
- **Request Body**:

    ```json
    {
        "newPassword": "string"
    }
    ```

- **Query Parameters**:
  - `link`: A link sent to the user’s email to direct user to reset page.
- **Response**:
  - **Status**: 200 OK
  - **Body**:

    ```json
    {
        "responseMsg": "Password has been reset successfully"
    }
    ```

## Error Handling

- If any request fails, the API will respond with an error message in the following format:

    ```json
    {
        "error": "Error message",
        "statusCode": "number"
    }
    ```

## Notes

- This API uses sessions and cookies for user authentication. The said cookies are stored securely and only accessible to the server. They are stored in the user's browser.

- This API has a rate limit of 100 requests per 15 minutes to prevent abuse.


<!-- DB_HOST=localhost
DB_PASSWORD=Password@1
DB_USER=postgres
DB_PORT=5432
DB_NAME=construction
SECRET=MySecureSecret

EMAIL=chimmypeters@gmail.com
EMAIL_PASS=ihzffrfitltdatkg

DATABASE_URL=`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` -->