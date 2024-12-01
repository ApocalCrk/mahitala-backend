const express = require("express");
const router = express.Router();
const { register, login } = require('../../controllers/auth');

router.post('/auth/register', async(req, res) => {
    const response = await register(req, res);
    return response;
});

router.post('/auth/login', async (req, res) => {
    const response = await login(req, res);
    return response;
});

module.exports = router;