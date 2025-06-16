// routes/kategori.js

const express = require("express");
const router = express.Router();
const {
    getAllKategori,
    getBestKategori,
    getKategoriById
} = require('../../controllers/kategori');

router.get('/kategori/all', getAllKategori);

router.get('/kategori/best', getBestKategori);

router.get('/kategori/:id', getKategoriById);

module.exports = router;