// cuaca.js

const CuacaModel = require('../models/cuacaModel');

const getCuacaNow = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const data = await CuacaModel.fetchWeatherData(latitude, longitude);
    res.json({ dataCuaca: data });
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

const getForecastData = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const forecastData = await CuacaModel.getForecastData(latitude, longitude);
    
    if (req.user) {
      const user_id = req.user.user_id;
      CuacaModel.updateUserLocation(latitude, longitude, user_id).catch(err => {
        console.error("Error updating user location:", err);
      });
    }
    
    res.json(forecastData);
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

const getWarningData = async (req, res) => {
  try {
    const data = await CuacaModel.getWarningData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

const getCropPredictions = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const result = await CuacaModel.fetchCropPredictions({ latitude, longitude });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

const getCropRecommendation = async (req, res) => {
  const { label } = req.query;
  try {
    const result = await CuacaModel.fetchCropRecommendations(label);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

const getForecastWeekly = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const data = await CuacaModel.fetchWeeklyForecast(latitude, longitude);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

module.exports = {
  getCuacaNow,
  getForecastData,
  getCropPredictions,
  getCropRecommendation,
  getForecastWeekly,
  getWarningData
};