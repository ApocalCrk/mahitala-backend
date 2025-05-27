const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { averageWeatherToday, registerToken } = require("../../controllers/notification");

router.post("/notifications/send", averageWeatherToday);
router.post("/notifications/register-token", verifyToken, registerToken);

module.exports = router;
