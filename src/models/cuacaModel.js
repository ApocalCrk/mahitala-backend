const db = require('../config/db/setup');

const WeatherModel = {
  fetchWeatherData: (adm, defaultAdm, callback) => {
    const axios = require('axios');
    const API_URL_BMKG = process.env.API_URL_BMKG;
    const targetAdm = adm || defaultAdm;

    axios
      .get(`${API_URL_BMKG}?adm1=${targetAdm}`)
      .then((response) => callback(null, response.data))
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
      queryParams = [latitude, longitude, latitude, provinsi || defaultProvinsi];
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

  fetchWeeklyForecast: (params, callback) => {
    const { latitude, longitude } = params;

    const sql = `
      SELECT *, 
        (6371 * ACOS(
          COS(RADIANS(?)) * COS(RADIANS(lat)) * COS(RADIANS(lon) - RADIANS(?)) + 
          SIN(RADIANS(?)) * SIN(RADIANS(lat))
        )) AS distance 
      FROM forecast_weekly
      WHERE DATE(waktu) != CURDATE() AND DATE(waktu) >= CURDATE()
      ORDER BY distance ASC, waktu ASC
      LIMIT 7
    `;
    const queryParams = [latitude, longitude, latitude];

    db.query(sql, queryParams, callback);
  },
};

module.exports = WeatherModel;