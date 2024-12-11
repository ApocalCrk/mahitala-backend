# Weather Prediction System with AI-based Crop Recommendations

This is the backend repository for the Weather Prediction System, which integrates AI-powered crop recommendations. The backend provides RESTful APIs to handle data management, AI model integration, and weather forecast processing.

## Features

- **Weather Prediction Integration**: Provides weather data forecasts from BMKG APIs.
- **AI-based Crop Recommendation**: Suggests suitable crops based on parameters such as temperature, humidity, and rainfall.
- **Data Management**: Handles storage and retrieval of agricultural data including land usage, production, and crop statistics.
- **Scalable Architecture**: Built with Express.js, ensuring efficient handling of requests and responses.

## Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MySQL
- **AI Model**: Python-based `.pkl` model integrated via API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ApocalCrk/mahitala-backend.git
   cd mahitala-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env`, based on the provided `.env.example`:
   ```bash
    cp .env.example .env
   ```

   The `.env` file should contain the following variables:
   ```env
    TYPE = "development"

    PORT = 3000
    DB_HOST = "localhost"
    DB_USER = "root"
    DB_PASS = ""
    DB_NAME = "gis_system"

    JWT_SECRET = "whatever_secret_you_want"

    # Region is locked to Yogyakarta for now
    API_URL_BMKG = "https://api.bmkg.go.id/publik/prakiraan-cuaca"
    DEFAULT_ADM = "34" 
    DEFAULT_PROVINSI = "Daerah Istimewa Yogyakarta" 
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## Project Structure

```
.
├── public
|  └── images
|  └── uploads
├── src
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── utils
├── tests
├── .env
|── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Future Enhancements

- Add real-time data syncing with BMKG.
- Implement user authentication and role-based access control.
- Integrate additional AI models for pest control recommendations.

## Contributions

Contributions are welcome! Please fork the repository and create a pull request with detailed descriptions of your changes.

---

Feel free to explore and contribute to make this project even better! 🚀
