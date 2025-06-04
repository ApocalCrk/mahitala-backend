### `docs/forum.md5`

This document outlines the forum and discussion API endpoints.

#### Endpoints

* **GET `/forum/recent`**
    * **Description**: Retrieves recent forum discussions for the authenticated user, including their replies. Requires authentication.
    * **Responses**:
        * `200 OK`: List of recent forum discussions.
            ```json
            [
              {
                "id_diskusi": "number",
                "username": "string",
                "tgl_dibuat": "string", // Date string
                "judul": "string",
                "isi": "string",
                "jumlah_pembaca": "number",
                "kategori": {
                  "id_kategori": "number",
                  "nama": "string"
                },
                "main_replies": [
                  {
                    "id_interact": "number",
                    "username": "string",
                    "tanggal": "string", // Date string
                    "isi": "string",
                    "sub_replies": [
                      {
                        "id_reply": "number",
                        "username": "string",
                        "tanggal": "string", // Date string
                        "isi": "string"
                      }
                    ]
                  }
                ],
                "jumlah_replies": "number"
              }
            ]
            ```
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/all`**
    * **Description**: Retrieves all forum discussions, including replies, without user-specific filtering.
    * **Responses**:
        * `200 OK`: List of all forum discussions. (Similar structure to `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/latest`**
    * **Description**: Retrieves the latest forum discussions, ordered by creation date, including replies.
    * **Responses**:
        * `200 OK`: List of latest forum discussions. (Similar structure to `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/top-discussions`**
    * **Description**: Retrieves top forum discussions based on a combination of views and replies.
    * **Responses**:
        * `200 OK`: List of top forum discussions. (Similar structure to `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/category/:id`**
    * **Description**: Retrieves forum discussions filtered by a specific category ID.
    * **Path Parameters**:
        * `id`: `number` (required) - The ID of the category.
    * **Responses**:
        * `200 OK`: List of forum discussions in the specified category. (Similar structure to `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/search/:search`**
    * **Description**: Searches forum discussions by a keyword present in the title or content.
    * **Path Parameters**:
        * `search`: `string` (required) - The keyword to search for.
    * **Responses**:
        * `200 OK`: List of forum discussions matching the keyword. (Similar structure to `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/:id`**
    * **Description**: Retrieves a single forum discussion by its ID, including all its replies.
    * **Path Parameters**:
        * `id`: `number` (required) - The ID of the discussion.
    * **Responses**:
        * `200 OK`: Single forum discussion with its replies. (Similar structure to an item in `/forum/recent`).
        * `500 Internal Server Error`: Database or server error.

* **POST `/forum`**
    * **Description**: Creates a new forum discussion. Requires authentication.
    * **Request Body**:
        ```json
        {
          "judul": "string",
          "isi": "string",
          "id_kategori": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Discussion created successfully.
            ```json
            {
              "message": "Discussion created successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **PUT `/forum`**
    * **Description**: Updates an existing forum discussion. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id_diskusi": "number", // Required for update
          "judul": "string",
          "isi": "string",
          "id_kategori": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Discussion updated successfully.
            ```json
            {
              "message": "Discussion updated successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **DELETE `/forum`**
    * **Description**: Deletes a forum discussion. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id": "number" // The ID of the discussion to delete
        }
        ```
    * **Responses**:
        * `200 OK`: Discussion deleted successfully.
            ```json
            {
              "message": "Discussion deleted successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **POST `/forum/reply`**
    * **Description**: Creates a main reply (top-level comment) to a forum discussion. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id_diskusi": "number",
          "isi": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Main reply created successfully.
            ```json
            {
              "message": "Main reply created successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **POST `/forum/sub-reply`**
    * **Description**: Creates a sub-reply (nested comment) to a main reply. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id_interact": "number", // The ID of the main reply being replied to
          "isi": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Sub-reply created successfully.
            ```json
            {
              "message": "Sub reply created successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **DELETE `/forum/reply/:id`**
    * **Description**: Deletes a main reply (top-level comment) and all its sub-replies. Requires authentication.
    * **Path Parameters**:
        * `id`: `number` (required) - The ID of the main reply.
    * **Responses**:
        * `200 OK`: Reply deleted successfully.
            ```json
            {
              "message": "Reply deleted successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **DELETE `/forum/first-reply/:id`**
    * **Description**: This endpoint seems to specifically target the "first" reply of a discussion. Its exact behavior might need clarification with the backend logic. It deletes the main reply associated with `id`.
    * **Path Parameters**:
        * `id`: `number` (required) - The `id_interact` of the main reply to delete.
    * **Responses**:
        * `200 OK`: Reply deleted successfully.
            ```json
            {
              "message": "Reply deleted successfully (first reply removed)"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **DELETE `/forum/second-reply/:id`**
    * **Description**: Deletes a second-level reply (sub-reply). Requires authentication.
    * **Path Parameters**:
        * `id`: `number` (required) - The `id_reply` of the second-level reply.
    * **Responses**:
        * `200 OK`: Reply deleted successfully.
            ```json
            {
              "message": "Reply deleted successfully"
            }
            ```
        * `500 Internal Server Error`: Database or server error.

* **GET `/forum/check-harga-komoditas-produsen`**
    * **Description**: Retrieves commodity market prices relevant for producers.
    * **Responses**:
        * `200 OK`: Commodity price data.
            ```json
            [
              {
                "id_harga": "number",
                "nama_komoditas": "string",
                "harga": "number",
                "tanggal": "string" // Date string (e.g., "YYYY-MM-DD HH:MM:SS")
              }
            ]
            ```
        * `500 Internal Server Error`: Database or server error.