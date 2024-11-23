const express = require("express");
const router = express.Router();
const db = require('../db/setup');

router.get('/kategori/all', async(req, res) => {
    try {
        const sql = "SELECT * FROM kategori";
        db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);

            const countDiskusi = "SELECT id_kategori, COUNT(id_kategori) AS jumlah_diskusi FROM forum_diskusi GROUP BY id_kategori";

            db.query(countDiskusi, (err, countResult) => {
                if (err) return res.status(500).send(err);

                const formattedResult = result.map((item) => {
                    const count = countResult.find((countItem) => countItem.id_kategori === item.id_kategori);
                    return {
                        id_kategori: item.id_kategori,
                        nama: item.nama_kategori,
                        gambar: item.gambar,
                        jumlah_diskusi: count ? count.jumlah_diskusi : 0,
                    };
                });
                res.status(200).send(formattedResult);
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/kategori/best', async(req, res) => {
    try {
        const sql = "(SELECT kategori.id_kategori, kategori.nama_kategori, kategori.gambar, COUNT(forum_diskusi.id_kategori) AS jumlah_digunakan FROM kategori JOIN forum_diskusi ON kategori.id_kategori = forum_diskusi.id_kategori GROUP BY kategori.id_kategori ORDER BY RAND() LIMIT 3) UNION ALL (SELECT kategori.id_kategori, kategori.nama_kategori, kategori.gambar, 0 AS jumlah_digunakan FROM kategori LEFT JOIN forum_diskusi ON kategori.id_kategori = forum_diskusi.id_kategori WHERE forum_diskusi.id_kategori IS NULL ORDER BY RAND() LIMIT 3) LIMIT 3";

        db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);

            const formattedResult = result.map((item) => ({
                id_kategori: item.id_kategori,
                nama: item.nama_kategori,
                gambar: item.gambar,
                jumlah_digunakan: item.jumlah_digunakan,
            }));

            res.status(200).send(formattedResult);
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/kategori/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM kategori WHERE id_kategori = ${id}`;
        db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length === 0) {
                return res.status(404).send({ message: "Kategori tidak ditemukan" });
            }

            const formattedResult = result.map((item) => ({
                id_kategori: item.id_kategori,
                nama: item.nama_kategori,
                gambar: item.gambar,
            }));

            res.status(200).send(formattedResult);
        }
        );
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;