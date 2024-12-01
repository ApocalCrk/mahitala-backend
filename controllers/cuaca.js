const db = require('../db/setup');
const calculateDistance = require('../utils/calculateDistance');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL_BMKG = process.env.API_URL_BMKG;
const default_adm = process.env.DEFAULT_ADM;
const default_provinsi = process.env.DEFAULT_PROVINSI;

const getCuacaNow = async (req, res) => {
    const { adm } = req.body;
    try {
        if (!adm) {
            const response = await axios.get(`${API_URL_BMKG}?adm1=${default_adm}`);
            const dataCuaca = response.data;
            res.json({dataCuaca});
        } else {
            const response = await axios.get(`${API_URL_BMKG}?adm1=${adm}`);
            const dataCuaca = response.data;
            res.json({dataCuaca});
        }
    } catch (error) {
        res.status(500).json({ message: "Error: Fetching data error"});
    }
};

const getNearestLocation = async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const response = await axios.get(`${API_URL_BMKG}?adm1=${default_adm}`);
        const dataCuaca = response.data.data;

        let nearestLocation = null;
        let minDistance = Infinity;

        dataCuaca.forEach((location) => {
            const locationLat = location.lokasi.lat;
            const locationLon = location.lokasi.lon;

            const distance = calculateDistance(latitude, longitude, locationLat, locationLon);

            if (distance < minDistance) {
            minDistance = distance;
            nearestLocation = location;
            }
        });

        if (nearestLocation) {
            res.status(200).json({
            nearestLocation: nearestLocation.lokasi,
            weatherData: nearestLocation.cuaca,
            distance: minDistance,
            });
        } else {
            res.status(404).json({ message: "No locations found" });
        }
    
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: Fetching data error" });
    }
};

const getCropPredictions = async (req, res) => {
    const { provinsi, latitude, longitude } = req.body;
    try {
        let sql;
        let params;
    
        if (latitude && longitude) {
          sql = `
            SELECT *, 
              (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(lat)) * COS(RADIANS(lon) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(lat)))) AS distance 
            FROM predictions 
            WHERE provinsi = ? 
            ORDER BY distance ASC 
            LIMIT 1
          `;
          params = [latitude, longitude, latitude, provinsi || default_provinsi];
        } else {
          sql = "SELECT * FROM predictions WHERE provinsi = ?";
          params = [provinsi || default_provinsi];
        }
    
        db.query(sql, params, (err, result) => {
          if (err) return res.status(500).send(err);
          res.json(result);
        });
    } catch (error) {
    res.status(500).json({ message: "Error: Fetching data error" });
    }
};

const getCropRecommendation = async (req, res) => {
    const { label } = req.body;
    try {
        if (!label) {
            const sql = "SELECT * FROM crop_recom_range";
            db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
            });
        } else {
            const sql = "SELECT * FROM crop_recom_range WHERE label = ?";
            db.query(sql, [label], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Error: Fetching data error"});
    }
};

const getForecastWeekly = async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
      if (!latitude || !longitude) {
        return res.status(400).json({ message: "Invalid latitude or longitude" });
      }
  
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
      const params = [latitude, longitude, latitude];
  
      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.json(result);
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error: Fetching data error" });
    }
};

module.exports = {
    getCuacaNow,
    getNearestLocation,
    getCropPredictions,
    getCropRecommendation,
    getForecastWeekly
};
