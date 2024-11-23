const express = require("express");
const router = express.Router();
const db = require('../db/setup');
const { hashToken, verifyToken } = require('../utils/encryption');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/auth/register', async(req, res) => {
    try {
        const { username, token } = req.body;
        const checkUser = "SELECT * FROM forum_akses WHERE username = ?";
        db.query(checkUser, [username], (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length > 0) {
                return res.status(400).json({ message: "Username telah terdaftar" });
            }else{
                const sql = "INSERT INTO forum_akses (username, token) VALUES (?, ?)";
                db.query(sql, [username, hashToken(token)], (err, result) => {
                    if (err) return res.status(500).send(err);
                    const payload = { username, token };
                    const jwtToken = jwt.sign(payload, JWT_SECRET);
                    res.json({ 
                        message: "Registrasi berhasil", 
                        token: jwtToken,
                        user: { username, token: hashToken(token) }
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const { username, token } = req.body;
        const sql = "SELECT * FROM forum_akses WHERE username = ?";
        db.query(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length > 0) {
                const storedToken = result[0].token;
                if (verifyToken(token, storedToken)) {
                    const payload = { username, token };
                    const jwtToken = jwt.sign(payload, JWT_SECRET);

                    res.json({ 
                        message: "Login berhasil", 
                        token: jwtToken,
                        user: { username, token: storedToken }
                    });
                } else {
                    res.status(400).json({ message: "Token tidak valid" });
                }
            } else {
                res.status(400).json({ message: "Username tidak ditemukan" });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;