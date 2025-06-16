const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { fetchBMKGIssued, registerToken } = require("../../controllers/notification");

router.post("/notifications/send", fetchBMKGIssued);
router.post("/notifications/register-token", verifyToken, registerToken);

module.exports = router;
