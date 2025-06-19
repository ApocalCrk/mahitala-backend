const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { generateData, registerToken } = require("../../controllers/notification");

router.post("/notifications/send", generateData);
router.post("/notifications/register-token", verifyToken, registerToken);

module.exports = router;
