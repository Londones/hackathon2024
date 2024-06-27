const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const authenticateToken = require("../middleware/authmiddleware");

const { getUserAlerts } = require("../controllers/AlertController");

router.get("/:userId/:diseaseName", authenticateToken, getUserAlerts);

module.exports = router;