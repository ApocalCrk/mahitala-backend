### `docs/notification.md5`

This document outlines the notification-related functionalities and API endpoints, including scheduled tasks for weather alerts and crop estimations.

#### Functions and Scheduled Jobs (Backend Logic)

* **`fetchBMKGIssued()`**
    * **Description**: Fetches extreme weather warning data from an external BMKG API. This function is designed to run periodically.
    * **Logic**:
        * Connects to `process.env.API_WARNING_BMKG`.
        * Compares the `issued` timestamp from the API response with a cached timestamp (from `../cache/bmkg-issued.json`).
        * If new data (`issued` timestamp is different) is detected:
            * Parses the `text_warning` (HTML-encoded) to extract relevant details (location, time, type of warning).
            * Generates a notification title and body (e.g., "Peringatan Dini Cuaca Ekstrem").
            * Sends push notifications via Firebase Cloud Messaging (FCM) to all registered users.
            * Updates the `bmkg-issued.json` cache with the new `issued` timestamp.
    * **Scheduled**: Runs every 10 minutes (`cron.schedule("*/10 * * * *", ...)`).

* **`generateData({ fcmToken, title, body })`**
    * **Description**: A utility function responsible for sending a single Firebase push notification and logging the notification attempt to the database.
    * **Parameters**:
        * `fcmToken`: `string` (required) - The Firebase Cloud Messaging token of the recipient device.
        * `title`: `string` (required) - The title of the notification.
        * `body`: `string` (required) - The main message content of the notification.
    * **Returns**: `Promise<object>` resolving to a status object (e.g., `{ success: true }` or `{ success: false, error: ... }`).
    * **Error Handling**: Specifically handles `messaging/registration-token-not-registered` errors, implying the FCM token is invalid and might need to be removed from the database.

* **`weatherCondition()`**
    * **Description**: Periodically checks the current weather conditions for all users based on their registered locations and sends notifications for extreme conditions.
    * **Logic**:
        * Retrieves all users from the database, including their `lat` and `lon`.
        * For each user, fetches their current weather forecast data using `cuacaModel.getForecastData`.
        * Identifies weather conditions considered "extreme" (specifically weather codes 60-97, which might refer to rain, storms, etc., depending on the weather API's coding).
        * If extreme conditions are met, constructs a tailored notification and sends it via `generateData`.
    * **Scheduled**: Runs hourly (`cron.schedule("0 */1 * * *", ...)`).

* **`analyzeWeather(data)`**
    * **Description**: A helper function to analyze a list of weather data points to compute averages and dominant conditions.
    * **Parameters**:
        * `data`: `Array<object>` - An array of weather data objects, where each object is expected to have `T` (temperature), `Hu` (humidity), and `weather_desc` (weather description).
    * **Returns**: An object containing `avgTemperature` (average temperature), `avgHumidity` (average humidity), and `mostFrequentWeatherDesc` (the most common weather description).

* **`averageWeatherToday()`**
    * **Description**: Sends a daily summary notification about the average weather conditions for each user's location.
    * **Logic**:
        * Retrieves all users and their location data.
        * For each user, fetches their weather forecast data.
        * Utilizes `analyzeWeather` to determine the average temperature, humidity, and most frequent weather description for the day.
        * Composes a notification message with these averages and sends it using `generateData`.
    * **Scheduled**: Runs daily at midnight (`cron.schedule("0 0 * * *", ...)`).

* **`automationEstimatedCrop()`**
    * **Description**: Automates notifications to users regarding their estimated crop harvest dates.
    * **Logic**:
        * Retrieves all users and their associated field data from the database.
        * For each field, calculates the remaining days until `estimasi_panen` (estimated harvest date).
        * If the harvest is within a predefined alert window (e.g., less than 7 days, or on the exact day), a notification is generated and sent via `generateData`.
    * **Scheduled**: Runs daily at midnight (`cron.schedule("0 0 * * *", async () => { ... })`).

#### API Endpoints

* **POST `/notification/register-token`**
    * **Description**: Registers or updates a user's Firebase Cloud Messaging (FCM) token. This token is essential for sending push notifications to a specific device. Requires authentication.
    * **Request Body**:
        ```json
        {
          "fcmToken": "string" // The FCM token received from the client-side
        }
        ```
    * **Responses**:
        * `200 OK`: FCM token registered successfully.
            ```json
            {
              "message": "FCM token registered successfully"
            }
            ```
        * `400 Bad Request`: Missing `userId` (from authentication) or `fcmToken` in the request body.
            ```json
            {
              "message": "Missing userId or fcmToken"
            }
            ```
        * `500 Internal Server Error`: Database error during token update/insertion.

* **GET `/notification/user-fcm-token`**
    * **Description**: Retrieves the FCM token associated with the authenticated user. Primarily for debugging or internal checks. Requires authentication.
    * **Responses**:
        * `200 OK`: FCM token retrieved successfully.
            ```json
            {
              "fcmToken": "string"
            }
            ```
        * `500 Internal Server Error`: Database error or no FCM token found for the user.