const db = require("../config/db/setup");
const axios = require("axios");
const processWeeklyForecast = require("../utils/processWeeklyForecast");

const WeatherModel = {
  fetchWeatherData: (latitude, longitude, callback) => {
    const API_URL_BMKG_PRS = process.env.API_URL_BMKG_PRS;

    axios.get(`${API_URL_BMKG_PRS}?lat=${latitude}&lon=${longitude}`)
      .then((response) => {
        const dataCuaca = response.data.data.cuaca;
        
        if (!dataCuaca || dataCuaca.length === 0) {
          return callback(new Error("No weather data found"), null);
        }

        const weatherData = {
          nearestLocation: response.data.data.lokasi,
          weatherData: dataCuaca
        };
        callback(null, weatherData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        callback(error, null);
      });
  },

  getForecastData: (latitude, longitude, callback) => {
    const API_URL_BMKG_AMANDEMEN = process.env.API_URL_BMKG_AMANDEMEN;

    axios
      .get(`${API_URL_BMKG_AMANDEMEN}?lon=${longitude}&lat=${latitude}`)
      .then((response) => {
        const dataCuaca = response.data.data[0];

        callback(null, {
          nearestLocation: dataCuaca.lokasi,
          weatherData: dataCuaca.cuaca,
        });
      })
      .catch((error) => {
        console.log(error);
        callback(error, null);
      });
  },

  getWarningData: (callback) => {
    const API_NOTIF = process.env.API_WARNING_BMKG;

    axios
      .get(API_NOTIF)
      .then((response) => {
        const data = response.data;

        callback(null, data);
      })
      .catch((error) => callback(error, null));
  },

  fetchWeeklyForecast: (latitude, longitude, callback) => {
    const API_URL_BMKG_AMANDEMEN = process.env.API_URL_BMKG_AMANDEMEN;

    axios
      .get(`${API_URL_BMKG_AMANDEMEN}?lon=${longitude}&lat=${latitude}`)
      .then((response) => {
        const data = response.data.data[0];

        const weeklyForecast = processWeeklyForecast(data.cuaca);

        callback(null, weeklyForecast);
      })
      .catch((error) => callback(error, null));
  },

  fetchCropPredictions: (params, callback) => {
    const { latitude, longitude } = params;
    let sql;
    let queryParams;

    if (latitude && longitude) {
      sql = `
        WITH ClosestRecommendation AS (
          SELECT 
              r.*,
              (6371 * ACOS(
                  COS(RADIANS(?)) * COS(RADIANS(r.lat)) * COS(RADIANS(r.lon) - RADIANS(?)) + 
                  SIN(RADIANS(?)) * SIN(RADIANS(r.lat))
              )) AS distance_from_user
          FROM 
              rekomendasi_prakomputasi AS r
          ORDER BY 
              distance_from_user ASC
          LIMIT 1
        )
        SELECT 
            cr.*,
            b.rainfall,
            b.temperature,
            b.humidity,
            (6371 * ACOS(
                COS(RADIANS(cr.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(b.lon) - RADIANS(cr.lon)) + 
                SIN(RADIANS(cr.lat)) * SIN(RADIANS(b.lat))
            )) AS distance_from_weather_station
        FROM 
            ClosestRecommendation AS cr
        CROSS JOIN 
            prakiraan_cuaca_bmkg AS b
        ORDER BY 
            distance_from_weather_station ASC
        LIMIT 1;
      `;
      
      queryParams = [
        latitude,
        longitude,
        latitude
      ];

    } else {
      sql = `
        SELECT 
            r.*,
            b.rainfall,
            b.temperature,
            b.humidity,
            (6371 * ACOS(
                COS(RADIANS(r.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(b.lon) - RADIANS(r.lon)) + 
                SIN(RADIANS(r.lat)) * SIN(RADIANS(b.lat))
            )) AS distance_from_weather_station
        FROM 
            rekomendasi_prakomputasi AS r
        CROSS JOIN 
            prakiraan_cuaca_bmkg AS b
        ORDER BY 
            distance_from_weather_station ASC
        LIMIT 1;
      `;
      queryParams = [];
    }

    db.query(sql, queryParams, callback);
  },

  fetchCropRecommendations: (label, callback) => {
    const sql = label
      ? "SELECT * FROM kondisi_tanaman WHERE label = ?"
      : "SELECT * FROM kondisi_tanaman";
    const params = label ? [label] : [];

    db.query(sql, params, callback);
  },

  updateUserLocation: (latitude, longitude, userId, callback) => {
    const sql = `UPDATE users SET lat = ?, lon = ? WHERE user_id = ?`;
    db.query(sql, [latitude, longitude, userId], (err, result) => {
      if (err) return callback(err);

      callback(null, result);
    });
  }
};

module.exports = WeatherModel;
