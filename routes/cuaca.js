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


// fetch prediction forecast
router.post('/crop/predict', async(req, res) => {
  const { provinsi } = req.body;
  try {
    if (!provinsi) {
      const sql = "SELECT * FROM predictions WHERE provinsi = ?";

      db.query(sql, [default_provinsi], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
      });
    } else {
      const sql = "SELECT * FROM predictions WHERE provinsi = ?";
      db.query(sql, [provinsi], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error: Fetching data error"});
  }
});

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









// save weather data 
router.post('/cuaca/save', async(req, res) => {
  try {
    const { dataCuaca } = req.body;
    const sql = "INSERT INTO cuaca (lokasi_id, datetime, suhu, tcc, tp, weather_desc, ws, hu, vs) VALUES ?";
    const values = dataCuaca.map(entry => [
      entry.lokasi.adm2,
      entry.datetime,
      entry.t,
      entry.tcc,
      entry.tp,
      entry.weather_desc,
      entry.ws,
      entry.hu, 
      entry.vs
    ]);

    db.query(sql, [values], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Data cuaca berhasil disimpan");
    })
  } catch (error) {
    res.json({message: "Error: Saving Weather Data"})
  }
});





// export module
module.exports = router;
