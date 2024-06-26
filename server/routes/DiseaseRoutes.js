const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const authenticateToken = require("../middleware/authmiddleware");

const { saveDisease } = require("../controllers/DiseaseController");

router.post("/:diseaseName", authenticateToken, saveDisease);

module.exports = router;
