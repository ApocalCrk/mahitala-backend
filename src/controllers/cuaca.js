const CuacaModel = require('../models/cuacaModel');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getCuacaNow = (req, res) => {
  const { latitude, longitude } = req.query;

  CuacaModel.fetchWeatherData(latitude, longitude, (err, data) => {
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

const getForecastDataNT = (req, res) => {
  const { latitude, longitude } = req.query;

  CuacaModel.getForecastData(latitude, longitude, (err, data) => {
    if (err) {
      console.error("Error fetching forecast data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
}

const getForecastData = (req, res) => {
  const { latitude, longitude } = req.query;

  CuacaModel.getForecastData(latitude, longitude, (err, data) => {
    if (err) {
      console.error("Error fetching forecast data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    if (req.user) {
      const user_id = req.user.user_id;
      CuacaModel.updateUserLocation(latitude, longitude, user_id, (err) => {
        if (err) {
          console.error("Error updating user location:", err);
          return res.status(500).json({ message: "Error: Updating location error" });
        }
      });
    }
    res.json(data);
  });
};

const getWarningData = (req, res) => {
  CuacaModel.getWarningData((err, data) => {
    if (err) {
      console.error("Error fetching warning data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};

const getCropPredictions = (req, res) => {
  const { latitude, longitude } = req.query;

  CuacaModel.fetchCropPredictions(
    { latitude, longitude },
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
  const { label } = req.query;

  CuacaModel.fetchCropRecommendations(label, (err, result) => {
    if (err) {
      console.error("Error fetching crop recommendations:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(result);
  });
};

const getForecastWeekly = (req, res) => {
  const { latitude, longitude } = req.query;

  CuacaModel.fetchWeeklyForecast(latitude, longitude, (err, data) => {
    if (err) {
      console.error("Error fetching weekly forecast:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};

module.exports = {
  getCuacaNow,
  getNearestLocation,
  getForecastData,
  getCropPredictions,
  getCropRecommendation,
  getForecastWeekly,
  getForecastDataNT,
  getWarningData
};
