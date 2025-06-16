// route.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  getFieldByUserID, createField, deleteField, getFieldById,
  getCropData, getCropById, updateField, reverseGeocode, radarInfo
} = require("../../controllers/field");

// --- Rute yang tidak memerlukan autentikasi ---
router.get("/reverse-geocode", reverseGeocode);
router.get("/radar-info", radarInfo);
router.get("/crops", getCropData);
router.get("/crop/:id_tanaman", getCropById);

// --- Rute yang memerlukan autentikasi (verifyToken) ---
router.post("/fields", verifyToken, getFieldByUserID);
router.post("/field/create", verifyToken, createField);
router.put("/field/update", verifyToken, updateField);
router.delete("/field/delete", verifyToken, deleteField);

// Catatan: Rute ini sepertinya salah. Seharusnya mungkin /field/:id_field
// dan menggunakan verifyToken jika data lahan bersifat privat.
// Untuk saat ini, saya biarkan sesuai aslinya tapi tanpa async wrapper.
// Jika ingin mengambil data spesifik field milik user, rutenya bisa jadi:
// router.get("/field/:id_field", verifyToken, getFieldById);
router.get("/field/:id_tanaman", verifyToken, getFieldById); // Sesuai file asli

module.exports = router;