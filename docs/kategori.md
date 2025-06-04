### `docs/kategori.md5`

This document outlines the category-related API endpoints for forums or other categorized content.

#### Endpoints

* **GET `/kategori/all`**
    * **Description**: Retrieves all available categories.
    * **Responses**:
        * `200 OK`: List of all categories.
            ```json
            [
              {
                "id_kategori": "number",
                "nama_kategori": "string"
              }
            ]
            ```
        * `500 Internal Server Error`: Database or server error.

* **GET `/kategori/best`**
    * **Description**: Retrieves the "best" or most popular categories based on internal logic (e.g., categories with most discussions).
    * **Responses**:
        * `200 OK`: List of best categories.
            ```json
            [
              {
                "id_kategori": "number",
                "nama_kategori": "string"
              }
            ]
            ```
        * `500 Internal Server Error`: Database or server error.

* **GET `/kategori/:id`**
    * **Description**: Retrieves details for a specific category by its ID.
    * **Path Parameters**:
        * `id`: `number` (required) - The ID of the category.
    * **Responses**:
        * `200 OK`: Category data.
            ```json
            {
              "id_kategori": "number",
              "nama_kategori": "string"
            }
            ```
        * `404 Not Found`: Category not found.
            ```json
            {
              "message": "Category not found"
            }
            ```
        * `500 Internal Server Error`: Database or server error.