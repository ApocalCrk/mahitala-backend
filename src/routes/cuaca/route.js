const express = require("express");
const router = express.Router();
const verifyTokenOptional = require("../../middleware/verifyTokenOptional");

const { 
    getCuacaNow,
    getCropPredictions,
    getCropRecommendation,
    getForecastWeekly,
    getForecastData,
    getWarningData
} = require('../../controllers/cuaca');

router.get('/cuaca/now', verifyTokenOptional, getCuacaNow);

router.get('/cuaca/forecast', getForecastData);

router.get('/cuaca/warning', getWarningData);

router.get('/crop/predict', getCropPredictions);

router.get('/crop/recommendation', getCropRecommendation);

router.get('/cuaca/weekly', getForecastWeekly);


module.exports = router;