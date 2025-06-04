# API Documentation

Welcome to the API documentation for your application. This documentation provides detailed information about the various endpoints, their functionalities, and how to interact with them.

## Table of Contents

* [**Authentication Module**](auth.md)
    * Learn how to register, log in, and manage user sessions.
* [**Weather Module**](cuaca.md)
    * Explore endpoints related to current weather, forecasts, warnings, and crop predictions/recommendations.
* [**Field & Crop Management Module**](field.md)
    * Manage user fields, crop data, and utilize geocoding services.
* [**Forum & Discussion Module**](forum.md)
    * Interact with forum discussions, create posts, manage replies, and check commodity prices.
* [**Category Module**](kategori.md)
    * Retrieve information about different categories used within the application.
* [**Notification Module**](notification.md)
    * Understand how push notifications work, including token registration and automated alerts.

---

### Getting Started

To use these APIs, you will typically need:

1.  **Authentication**: Many endpoints require a valid JWT (JSON Web Token) in the `Authorization: Bearer <token>` header. Refer to the [Authentication Module](auth.md) for details on obtaining a token.
2.  **Request Format**: Most API requests expect JSON in the request body and respond with JSON.
3.  **Error Handling**: Pay attention to the HTTP status codes and error messages for proper error handling in your client applications.

---

Feel free to navigate through the modules using the links above to find the specific API information you need.