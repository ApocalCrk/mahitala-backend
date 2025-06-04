### `docs/auth.md5`

This document outlines the authentication-related API endpoints.

#### Endpoints

* **POST `/auth/register`**
    * **Description**: Registers a new user.
    * **Request Body**:
        ```json
        {
          "username": "string",
          "token": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Registration successful.
            ```json
            {
              "message": "Registrasi berhasil",
              "token": "string"
            }
            ```
        * `400 Bad Request`: Username already taken.
            ```json
            {
              "message": "Username telah terdaftar"
            }
            ```
        * `500 Internal Server Error`: Database or server error.
            ```json
            {
              "message": "Error: Creating user error"
            }
            ```

* **POST `/auth/login`**
    * **Description**: Logs in an existing user.
    * **Request Body**:
        ```json
        {
          "username": "string",
          "token": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Login successful.
            ```json
            {
              "message": "Login berhasil",
              "token": "string",
              "user": {
                "user_id": "number",
                "username": "string",
                "token": "string"
              }
            }
            ```
        * `400 Bad Request`: Username tidak ditemukan atau token tidak valid.
            ```json
            {
              "message": "Username tidak ditemukan"
            }
            ```
            or
            ```json
            {
              "message": "Token tidak valid"
            }
            ```
        * `500 Internal Server Error`: Database error.

* **GET `/auth/checkUser`**
    * **Description**: Checks if the user is authenticated and returns user details. Requires authentication (JWT token in header).
    * **Responses**:
        * `200 OK`: User authenticated.
            ```json
            {
              "user_id": "number",
              "username": "string",
              "email": "string",
              "lat": "number",
              "lon": "number",
              "fcm_token": "string"
            }
            ```
        * `500 Internal Server Error`: Database or server error.