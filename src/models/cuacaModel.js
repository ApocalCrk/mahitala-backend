const db = require("../config/db/setup");
const axios = require("axios");
const calculateDistance = require("../utils/calculateDistance");
const processWeeklyForecast = require("../utils/processWeeklyForecast");

const WeatherModel = {
  fetchWeatherData: (adm, defaultAdm, callback) => {
    const API_URL_BMKG = process.env.API_URL_BMKG;
    const targetAdm = adm || defaultAdm;

    axios
      .get(`${API_URL_BMKG}?adm1=${targetAdm}`)
      .then((response) => callback(null, response.data))
      .catch((error) => callback(error, null));
  },

  getNearestLocation: (latitude, longitude, callback) => {
    const API_URL_BMKG = process.env.API_URL_BMKG;
    const defaultAdm = process.env.DEFAULT_ADM;

    axios
      .get(`${API_URL_BMKG}?adm1=${defaultAdm}`)
      .then((response) => {
        const dataCuaca = response.data.data;

        let nearestLocation = null;
        let minDistance = Infinity;

        dataCuaca.forEach((location) => {
          const locationLat = location.lokasi.lat;
          const locationLon = location.lokasi.lon;

          const distance = calculateDistance(
            latitude,
            longitude,
            locationLat,
            locationLon
          );

          if (distance < minDistance) {
            minDistance = distance;
            nearestLocation = location;
          }
        });

        if (nearestLocation) {
          callback(null, {
            nearestLocation: nearestLocation.lokasi,
            weatherData: nearestLocation.cuaca,
            distance: minDistance,
          });
        } else {
          callback(new Error("No locations found"), null);
        }
      })
      .catch((error) => callback(error, null));
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
    const { provinsi, latitude, longitude, defaultProvinsi } = params;
    let sql;
    let queryParams;

    if (latitude && longitude) {
      sql = `
        SELECT *, 
          (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(lat)) * COS(RADIANS(lon) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(lat)))) AS distance 
        FROM predictions 
        WHERE provinsi = ? 
        ORDER BY distance ASC 
        LIMIT 1
      `;
      queryParams = [
        latitude,
        longitude,
        latitude,
        provinsi || defaultProvinsi,
      ];
    } else {
      sql = "SELECT * FROM predictions WHERE provinsi = ?";
      queryParams = [provinsi || defaultProvinsi];
    }

    db.query(sql, queryParams, callback);
  },

  fetchCropRecommendations: (label, callback) => {
    const sql = label
      ? "SELECT * FROM crop_recom_range WHERE label = ?"
      : "SELECT * FROM crop_recom_range";
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
