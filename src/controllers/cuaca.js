const CuacaModel = require('../models/cuacaModel');
const dotenv = require('dotenv');

dotenv.config();

const getCuacaNow = (req, res) => {
  const { adm } = req.body;
  const defaultAdm = process.env.DEFAULT_ADM;

  CuacaModel.fetchWeatherData(adm, defaultAdm, (err, data) => {
    if (err) {
      console.error("Error fetching weather data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json({ dataCuaca: data });
  });
};


const getNearestLocation = (req, res) => {
  const { latitude, longitude } = req.body;

  CuacaModel.getNearestLocation(latitude, longitude, (err, data) => {
    if (err) {
      console.error("Error fetching nearest location:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};


const getCropPredictions = (req, res) => {
  const { provinsi, latitude, longitude } = req.body;
  const defaultProvinsi = process.env.DEFAULT_PROVINSI;

  CuacaModel.fetchCropPredictions(
    { provinsi, latitude, longitude, defaultProvinsi },
    (err, result) => {
      if (err) {
        console.error("Error fetching crop predictions:", err);
        return res.status(500).json({ message: "Error: Fetching data error" });
      }
      res.json(result);
    }
  );
};

const getCropRecommendation = (req, res) => {
  const { label } = req.body;

  CuacaModel.fetchCropRecommendations(label, (err, result) => {
    if (err) {
      console.error("Error fetching crop recommendations:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(result);
  });
};

const getForecastWeekly = (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Invalid latitude or longitude" });
  }

  CuacaModel.fetchWeeklyForecast({ latitude, longitude }, (err, result) => {
    if (err) {
      console.error("Error fetching forecast data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(result);
  });
};

module.exports = {
  getCuacaNow,
  getNearestLocation,
  getCropPredictions,
  getCropRecommendation,
  getForecastWeekly,
};
