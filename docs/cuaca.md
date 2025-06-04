### `docs/cuaca.md5`

This document outlines the weather-related API endpoints.

#### Endpoints

* **POST `/weather/now`**
    * **Description**: Retrieves current weather data for a given administrative area.
    * **Request Body**:
        ```json
        {
          "adm": "string" // Optional. If not provided, DEFAULT_ADM from environment variables will be used.
        }
        ```
    * **Responses**:
        * `200 OK`: Current weather data.
            ```json
            {
              "dataCuaca": "object"
            }
            ```
        * `500 Internal Server Error`: Error fetching weather data.
            ```json
            {
              "message": "Error: Fetching data error"
            }
            ```

* **POST `/weather/nearest`**
    * **Description**: Retrieves the nearest location based on provided latitude and longitude.
    * **Request Body**:
        ```json
        {
          "latitude": "number",
          "longitude": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Nearest location data.
            ```json
            {
              "data": "object"
            }
            ```
        * `500 Internal Server Error`: Error fetching nearest location.

* **GET `/weather/forecast-nt`**
    * **Description**: Retrieves forecast data for a given latitude and longitude (non-authenticated).
    * **Query Parameters**:
        * `latitude`: `number` (required)
        * `longitude`: `number` (required)
    * **Responses**:
        * `200 OK`: Forecast data.
            ```json
            {
              "data": "object"
            }
            ```
        * `500 Internal Server Error`: Error fetching forecast data.

* **POST `/weather/forecast`**
    * **Description**: Retrieves forecast data and optionally updates user's location. Requires authentication.
    * **Request Body**:
        ```json
        {
          "latitude": "number",
          "longitude": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Forecast data.
            ```json
            {
              "data": "object"
            }
            ```
        * `500 Internal Server Error`: Error fetching forecast data or updating user location.

* **GET `/weather/warning`**
    * **Description**: Retrieves weather warning data from BMKG.
    * **Responses**:
        * `200 OK`: Warning data.
            ```json
            {
              "issued": "string",
              "text_warning": "string",
              "valid_start": "string",
              "valid_end": "string"
            }
            ```
        * `500 Internal Server Error`: Error fetching warning data.

* **POST `/weather/crop-predictions`**
    * **Description**: Retrieves crop predictions based on province, latitude, and longitude.
    * **Request Body**:
        ```json
        {
          "provinsi": "string",
          "latitude": "number",
          "longitude": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Crop prediction results.
            ```json
            {
              "result": "object" // Details depend on the external prediction model's output
            }
            ```
        * `500 Internal Server Error`: Error fetching crop predictions.

* **POST `/weather/crop-recommendation`**
    * **Description**: Retrieves crop recommendations based on a crop label (e.g., predicted crop).
    * **Request Body**:
        ```json
        {
          "label": "string"
        }
        ```
    * **Responses**:
        * `200 OK`: Crop recommendation results.
            ```json
            {
              "result": "object" // Details depend on the external recommendation model's output
            }
            ```
        * `500 Internal Server Error`: Error fetching crop recommendations.

* **POST `/weather/forecast-weekly`**
    * **Description**: Retrieves weekly weather forecast for given coordinates.
    * **Request Body**:
        ```json
        {
          "latitude": "number",
          "longitude": "number"
        }
        ```
    * **Responses**:
        * `200 OK`: Weekly forecast data.
            ```json
            {
              "data": "object" // Structured weekly forecast data
            }
            ```
        * `500 Internal Server Error`: Error fetching weekly forecast data.