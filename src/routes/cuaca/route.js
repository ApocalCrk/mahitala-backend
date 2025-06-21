const express = require("express");
const router = express.Router();

const { 
    getCuacaNow,
    getCropPredictions,
    getCropRecommendation,
    getForecastWeekly,
    getForecastData,
    getWarningData
} = require('../../controllers/cuaca');

router.get('/cuaca/now', getCuacaNow);

router.get('/cuaca/forecast', getForecastData);

router.get('/cuaca/warning', getWarningData);

router.get('/crop/predict', getCropPredictions);

router.get('/crop/recommendation', getCropRecommendation);

router.get('/cuaca/weekly', getForecastWeekly);


module.exports = router;