const db = require("../config/db/setup");
const axios = require("axios");
const processWeeklyForecast = require("../utils/processWeeklyForecast");

const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const WeatherModel = {
  async fetchWeatherData(latitude, longitude) {
    try {
      const API_URL_BMKG_PRS = process.env.API_URL_BMKG_PRS;
      const response = await axios.get(`${API_URL_BMKG_PRS}?lat=${latitude}&lon=${longitude}`);
      
      const dataCuaca = response.data.data.cuaca;
      if (!dataCuaca || dataCuaca.length === 0) {
        throw new Error("No weather data found");
      }

      return {
        nearestLocation: response.data.data.lokasi,
        weatherData: dataCuaca,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  },

  async getForecastData(latitude, longitude) {
    try {
      const API_URL_BMKG_AMANDEMEN = process.env.API_URL_BMKG_AMANDEMEN;
      const response = await axios.get(`${API_URL_BMKG_AMANDEMEN}?lon=${longitude}&lat=${latitude}`);
      const dataCuaca = response.data.data[0];
      
      return {
        nearestLocation: dataCuaca.lokasi,
        weatherData: dataCuaca.cuaca,
      };
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      throw error;
    }
  },

  async getWarningData() {
    try {
      const API_NOTIF = process.env.API_WARNING_BMKG;
      const response = await axios.get(API_NOTIF);
      return response.data;
    } catch (error) {
      console.error("Error fetching warning data:", error);
      throw error;
    }
  },

  async fetchWeeklyForecast(latitude, longitude) {
    try {
      const API_URL_BMKG_AMANDEMEN = process.env.API_URL_BMKG_AMANDEMEN;
      const response = await axios.get(`${API_URL_BMKG_AMANDEMEN}?lon=${longitude}&lat=${latitude}`);
      const data = response.data.data[0];
      
      return processWeeklyForecast(data.cuaca);
    } catch (error) {
      console.error("Error fetching weekly forecast:", error);
      throw error;
    }
  },

  async fetchCropPredictions(params) {
    const { latitude, longitude } = params;
    let sql;
    let queryParams;

    if (latitude && longitude) {
      sql = `
        WITH ClosestRecommendation AS (
          SELECT r.*, (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(r.lat)) * COS(RADIANS(r.lon) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(r.lat)))) AS distance_from_user
          FROM rekomendasi_prakomputasi AS r
          ORDER BY distance_from_user ASC
          LIMIT 1
        )
        SELECT cr.*, b.rainfall, b.temperature, b.humidity, (6371 * ACOS(COS(RADIANS(cr.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(b.lon) - RADIANS(cr.lon)) + SIN(RADIANS(cr.lat)) * SIN(RADIANS(b.lat)))) AS distance_from_weather_station
        FROM ClosestRecommendation AS cr
        CROSS JOIN prakiraan_cuaca_bmkg AS b
        ORDER BY distance_from_weather_station ASC
        LIMIT 1;
      `;
      queryParams = [latitude, longitude, latitude];
    } else {
      sql = `
        SELECT r.*, b.rainfall, b.temperature, b.humidity, (6371 * ACOS(COS(RADIANS(r.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(b.lon) - RADIANS(r.lon)) + SIN(RADIANS(r.lat)) * SIN(RADIANS(b.lat)))) AS distance_from_weather_station
        FROM rekomendasi_prakomputasi AS r
        CROSS JOIN prakiraan_cuaca_bmkg AS b
        ORDER BY distance_from_weather_station ASC
        LIMIT 1;
      `;
      queryParams = [];
    }

    try {
      return await queryPromise(sql, queryParams);
    } catch (error) {
      console.error("Error fetching crop predictions:", error);
      throw error;
    }
  },

  async fetchCropRecommendations(label) {
    const sql = label ? "SELECT * FROM kondisi_tanaman WHERE label = ?" : "SELECT * FROM kondisi_tanaman";
    const params = label ? [label] : [];
    
    try {
      return await queryPromise(sql, params);
    } catch (error) {
      console.error("Error fetching crop recommendations:", error);
      throw error;
    }
  },

  async updateUserLocation(latitude, longitude, userId) {
    const sql = `UPDATE users SET lat = ?, lon = ? WHERE user_id = ?`;
    const params = [latitude, longitude, userId];
    try {
      await queryPromise(sql, params);
    } catch (error) {
      console.error("Error updating user location:", error);
      throw error;
    }
  },
};

module.exports = WeatherModel;