const express = require("express");
const router = express.Router();
const {
    getAllKategori,
    getBestKategori,
    getKategoriById
} = require('../../controllers/kategori');


router.get('/kategori/all', async(req, res) => {
    const response = await getAllKategori(req, res);
    return response;
});

router.get('/kategori/best', async(req, res) => {
    const response = await getBestKategori(req, res);
    return response;
});

router.get('/kategori/:id', async(req, res) => {
    const response = await getKategoriById(req, res);
    return response;
});

module.exports = router;