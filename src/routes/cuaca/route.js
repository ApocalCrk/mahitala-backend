const express = require("express");
const router = express.Router();
const { 
    getCuacaNow,
    getCropPredictions,
    getCropRecommendation,
    getForecastWeekly,
    getForecastData,
    getForecastDataNT,
    getWarningData
} = require('../../controllers/cuaca');

router.get('/cuaca/now', async(req, res) => {
    const response = getCuacaNow(req, res);
    return response;
});

router.get('/cuaca/forecastNT', async (req, res) => {
    const response = getForecastDataNT(req, res);
    return response;
});

router.get('/cuaca/forecast', async (req, res) => {
    const response = getForecastData(req, res);
    return response;
});

router.get('/cuaca/warning', async (req, res) => {
    const response = getWarningData(req, res);
    return response;
});

router.get('/crop/predict', async (req, res) => {
    const response = getCropPredictions(req, res);
    return response;
});

router.get('/crop/recommendation', async(req, res) => {
    const response = getCropRecommendation(req, res);
    return response;
});

router.get('/cuaca/weekly', async (req, res) => {
    const response = getForecastWeekly(req, res);
    return response;
});


module.exports = router;
