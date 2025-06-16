const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require('../../controllers/auth');
const verifyToken = require("../../middleware/verifyToken");

router.post('/auth/register', register);

router.post('/auth/login', login);

router.post('/auth/check', verifyToken, checkUser);

module.exports = router;