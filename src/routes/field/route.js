const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  getFieldByUserID,
  createField,
  deleteField,
  getFieldById,
  getCropData,
  getCropById,
  updateField,
  reverseGeocode,
  radarInfo
} = require("../../controllers/field");

router.get("/reverse-geocode", async (req, res) => {
  const response = await reverseGeocode(req, res);
  return response;
});

router.get("/radar-info", async (req, res) => {
  const response = await radarInfo(req, res);
  return response;
});

router.post("/fields", verifyToken, async (req, res) => {
  const response = getFieldByUserID(req, res);
  return response;
});

router.post("/field/create", verifyToken, async (req, res) => {
  const response = createField(req, res);
  return response;
});

router.put("/field/update", verifyToken, async (req, res) => {
  const response = updateField(req, res);
  return response;
});

router.delete("/field/delete", verifyToken, async (req, res) => {
  const response = deleteField(req, res);
  return response;
});

router.get("/field/:id_tanaman", async (req, res) => {
  const response = getFieldById(req, res);
  return response;
});

router.get("/crops", async (req, res) => {
  const response = getCropData(req, res);
  return response;
});

router.get("/crop/:id_tanaman", async (req, res) => {
  const response = getCropById(req, res);
  return response;
});

module.exports = router;
