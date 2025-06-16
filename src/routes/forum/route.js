// route.js

const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/image_processing");
const {
  getForumTerakhir, getAllForum, getForumTerbaru, getForumTopDiskusi,
  getForumByKategori, getForumByKeyword, getForumById, createForum,
  deleteForum, createReply, deleteFirstReply, deleteSecondReply,
  checkHargaKomoditasProdusen
} = require("../../controllers/forum");
const verifyToken = require("../../middleware/verifyToken");

// --- Rute Forum ---

// GET
router.get("/forum/diskusi-terakhir", verifyToken, getForumTerakhir);
router.get("/forum/all-diskusi", getAllForum);
router.get("/forum/diskusi-terbaru", getForumTerbaru);
router.get("/forum/top-diskusi", getForumTopDiskusi);
router.get("/forum/diskusi-kategori/:id", getForumByKategori);
router.get("/forum/diskusi-search/:search", getForumByKeyword);
router.get("/forum/diskusi/:id", getForumById);
router.get("/forum/harga-komoditas", checkHargaKomoditasProdusen);

// POST
router.post("/forum/diskusi", verifyToken, upload.single("gambar"), createForum);
router.post("/forum/diskusi/reply", verifyToken, createReply);

// DELETE
router.delete("/forum/diskusi/:id", verifyToken, deleteForum);
router.delete("/forum/diskusi/reply/firstIn/:id", verifyToken, deleteFirstReply);
router.delete("/forum/diskusi/reply/secIn/:id", verifyToken, deleteSecondReply);

module.exports = router;