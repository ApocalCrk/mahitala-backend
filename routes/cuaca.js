// define .lib
const express = require("express");
const router = express.Router();
const db = require('../db/setup');
const axios = require('axios');

// define url
const API_URL_BMKG = "https://api.bmkg.go.id/publik/prakiraan-cuaca";
const default_adm = "34";
const default_provinsi = "Daerah Istimewa Yogyakarta";


// fetch real-time forecast
router.post('/cuaca/now', async(req, res) => {
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
});

// fetch nearest forecast
router.post('/cuaca/nearest', async (req, res) => {
  const { latitude, longitude } = req.body;
  
  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Earth radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  try {
    const response = await axios.get(`${API_URL_BMKG}?adm1=34`);
    const dataCuaca = response.data.data;

    // Find the nearest location by calculating distances
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

    // Return the nearest location's weather data
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
});

// fetch prediction forecast
// router.post('/crop/predict', async(req, res) => {
//   const { provinsi } = req.body;
//   try {
//     if (!provinsi) {
//       const sql = "SELECT * FROM predictions WHERE provinsi = ?";

//       db.query(sql, [default_provinsi], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json(result);
//       });
//     } else {
//       const sql = "SELECT * FROM predictions WHERE provinsi = ?";
//       db.query(sql, [provinsi], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json(result);
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error: Fetching data error"});
//   }
// });

// fetch prediction forecast
router.post('/crop/predict', async (req, res) => {
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
});


// fetch recommendation crop data
router.post('/crop/recommendation', async(req, res) => {
  const { label } = req.body;
  try {
    if (!label) {
      const sql = "SELECT * FROM crop_recom_range";
      db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
      });
    }else{
      const sql = "SELECT * FROM crop_recom_range WHERE label = ?";
      db.query(sql, [label], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Error: Fetching data error"});
  }
});

// fetch weekly forecast
router.post('/cuaca/weekly', async (req, res) => {
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
});


module.exports = router;
