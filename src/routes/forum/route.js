const express = require("express");
const router = express.Router();
const upload = require("../../utils/upload");
const {
  getForumTerakhir,
  getAllForum,
  getForumTerbaru,
  getForumTopDiskusi,
  getForumByKategori,
  getForumByKeyword,
  getForumById,
  createForum,
  deleteForum,
  createReply,
  deleteFirstReply,
  deleteSecondReply,
} = require("../../controllers/forum");

router.get("/forum/diskusi-terakhir", async (req, res) => {
    const response = await getForumTerakhir(req, res);
    return response;
});

router.get("/forum/all-diskusi", async (req, res) => {
    const response = await getAllForum(req, res);
    return response;
});

router.get("/forum/diskusi-terbaru", async (req, res) => {
    const response = await getForumTerbaru(req, res);
    return response;
});

router.get("/forum/top-diskusi", async (req, res) => {
    const response = await getForumTopDiskusi(req, res);
    return response;
});

router.get("/forum/diskusi-kategori/:id", async (req, res) => {
    const response = await getForumByKategori(req, res);
    return response;
});

router.get("/forum/diskusi-search/:search", async (req, res) => {
    const response = await getForumByKeyword(req, res);
    return response;
});

router.get("/forum/diskusi/:id", async (req, res) => {
    const response = await getForumById(req, res);
    return response;
});

router.post("/forum/diskusi", upload.single("gambar"), async (req, res) => {
    const response = await createForum(req, res);
    return response;
});

router.delete("/forum/diskusi/:id", async (req, res) => {
    const response = await deleteForum(req, res);
    return response;
});

router.post("/forum/diskusi/reply", async (req, res) => {
    const response = await createReply(req, res);
    return response;
});

router.delete("/forum/diskusi/reply/firstIn/:id", async (req, res) => {
    const response = await deleteFirstReply(req, res);
    return response;
});

router.delete("/forum/diskusi/reply/secIn/:id", async (req, res) => {
    const response = await deleteSecondReply(req, res);
    return response;
});

module.exports = router;
