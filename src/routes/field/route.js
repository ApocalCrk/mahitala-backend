// route.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  getFieldByUserID, createField, deleteField, getFieldById,
  getCropData, getCropById, updateField, reverseGeocode, radarInfo,
  proxySentinelWMS, proxyWeatherTile
} = require("../../controllers/field");

// --- Rute yang tidak memerlukan autentikasi ---
router.get("/reverse-geocode", reverseGeocode);
router.get("/radar-info", radarInfo);
router.get("/crops", getCropData);
router.get("/crop/:id_tanaman", getCropById);
router.get('/proxy/weather-tile/:layer/:z/:x/:y.png', proxyWeatherTile);
router.get('/proxy/sentinel-hub', proxySentinelWMS);

// --- Rute yang memerlukan autentikasi (verifyToken) ---
router.post("/fields", verifyToken, getFieldByUserID);
router.post("/field/create", verifyToken, createField);
router.put("/field/update", verifyToken, updateField);
router.delete("/field/delete", verifyToken, deleteField);
router.get("/field/:id_field", verifyToken, getFieldById);

module.exports = router;