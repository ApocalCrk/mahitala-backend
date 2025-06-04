### `docs/field.md5`

This document outlines the field and crop management API endpoints.

#### Endpoints

* **GET `/field/user`**
    * **Description**: Retrieves all fields associated with the authenticated user. Requires authentication.
    * **Responses**:
        * `200 OK`: List of fields.
            ```json
            [
              {
                "id_field": "number",
                "nama_lahan": "string",
                "jenis_tanah": "string",
                "id_tanaman": "number",
                "coords": "string", // GeoJSON string or similar format
                "luas_lahan": "number",
                "tanggal_tanam": "string", // Date string (e.g., "YYYY-MM-DD")
                "estimasi_panen": "string" // Date string (e.g., "YYYY-MM-DD")
              }
            ]
            ```
        * `500 Internal Server Error`: Error fetching field data.

* **POST `/field`**
    * **Description**: Creates a new field for the authenticated user. Requires authentication.
    * **Request Body**:
        ```json
        {
          "nama_lahan": "string",
          "jenis_tanah": "string",
          "id_tanaman": "number",
          "coords": "string",
          "luas_lahan": "number",
          "tanggal_tanam": "string",
          "estimasi_panen": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Field created successfully.
            ```json
            {
              "message": "Field created successfully"
            }
            ```
        * `500 Internal Server Error`: Error creating field.

* **PUT `/field`**
    * **Description**: Updates an existing field owned by the authenticated user. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id_field": "number", // Required for update
          "nama_lahan": "string",
          "jenis_tanah": "string",
          "id_tanaman": "number",
          "coords": "string",
          "luas_lahan": "number",
          "tanggal_tanam": "string",
          "estimasi_panen": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Field updated successfully.
            ```json
            {
              "message": "Field updated successfully"
            }
            ```
        * `500 Internal Server Error`: Error updating field.

* **DELETE `/field`**
    * **Description**: Deletes a field owned by the authenticated user. Requires authentication.
    * **Request Body**:
        ```json
        {
          "id": "number" // The ID of the field to delete
        }
        ```
    * **Responses**:
        * `200 OK`: Field deleted successfully.
            ```json
            {
              "message": "Field deleted successfully"
            }
            ```
        * `500 Internal Server Error`: Error deleting field.

* **GET `/field/:id_field`**
    * **Description**: Retrieves details for a specific field by its ID. No authentication required.
    * **Path Parameters**:
        * `id_field`: `number` (required) - The ID of the field.
    * **Responses**:
        * `200 OK`: Field data.
            ```json
            {
              "id_field": "number",
              "nama_lahan": "string",
              "jenis_tanah": "string",
              "id_tanaman": "number",
              "coords": "string",
              "luas_lahan": "number",
              "tanggal_tanam": "string",
              "estimasi_panen": "string"
            }
            ```
        * `500 Internal Server Error`: Error fetching field by ID.

* **GET `/field/crop`**
    * **Description**: Retrieves all available crop data.
    * **Responses**:
        * `200 OK`: List of crop data.
            ```json
            [
              {
                "id_tanaman": "number",
                "nama_tanaman": "string",
                "deskripsi": "string"
              }
            ]
            ```
        * `500 Internal Server Error`: Error fetching crop data.

* **GET `/field/crop/:id_tanaman`**
    * **Description**: Retrieves details for a specific crop by its ID.
    * **Path Parameters**:
        * `id_tanaman`: `number` (required) - The ID of the crop.
    * **Responses**:
        * `200 OK`: Crop data.
            ```json
            {
              "id_tanaman": "number",
              "nama_tanaman": "string",
              "deskripsi": "string"
            }
            ```
        * `500 Internal Server Error`: Error fetching crop by ID.

* **GET `/field/geocode`**
    * **Description**: Performs reverse geocoding to get location details (e.g., administrative area) from latitude and longitude. Uses OpenStreetMap's Nominatim API.
    * **Query Parameters**:
        * `lat`: `number` (required) - Latitude.
        * `lon`: `number` (required) - Longitude.
    * **Responses**:
        * `200 OK`: Geocoding data.
            ```json
            {
              "place_id": "number",
              "osm_type": "string",
              "osm_id": "number",
              "lat": "string",
              "lon": "string",
              "display_name": "string",
              "address": {
                // ... various address components like road, suburb, city, state, country, postcode
              },
              "boundingbox": ["string", "string", "string", "string"]
            }
            ```
        * `400 Bad Request`: Missing `lat` or `lon` parameters.
        * `500 Internal Server Error`: Error fetching from API or reading from cache.
            ```json
            {
              // ... original geocoding data if from cache
              "from_cache": true,
              "warning": "Data diambil dari cache karena API gagal."
            }
            ```
            or
            ```json
            {
              "message": "Error message details"
            }
            ```