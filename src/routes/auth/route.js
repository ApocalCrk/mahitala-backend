const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require('../../controllers/auth');
const verifyToken = require("../../middleware/verifyToken");

router.post('/auth/register', async(req, res) => {
    const response = register(req, res);
    return response;
});

router.post('/auth/login', async (req, res) => {
    const response = login(req, res);
    return response;
});

router.post('/auth/check', verifyToken, async (req, res) => {
    const response = checkUser(req, res);
    return response;
});

module.exports = router;