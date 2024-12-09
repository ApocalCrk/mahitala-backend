const express = require("express");
const router = express.Router();
const { 
    getCuacaNow,
    getNearestLocation,
    getCropPredictions,
    getCropRecommendation,
    getForecastWeekly
} = require('../../controllers/cuaca');

router.post('/cuaca/now', async(req, res) => {
    const response = getCuacaNow(req, res);
    return response;
});

router.post('/cuaca/nearest', async (req, res) => {
    const response = getNearestLocation(req, res);
    return response;
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

router.post('/crop/predict', async (req, res) => {
    const response = getCropPredictions(req, res);
    return response;
});

router.post('/crop/recommendation', async(req, res) => {
    const response = getCropRecommendation(req, res);
    return response;
});

router.post('/cuaca/weekly', async (req, res) => {
    const response = await getForecastWeekly(req, res);
    return response;
});


module.exports = router;
