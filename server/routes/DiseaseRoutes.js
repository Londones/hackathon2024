const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const authenticateToken = require("../middleware/authmiddleware");

const { saveDisease } = require("../controllers/DiseaseController");

const { getUserDiseaseData } = require("../controllers/DiseaseController");

router.post("/:diseaseName", authenticateToken, saveDisease);

router.get("/:userId/:diseaseName", authenticateToken, getUserDiseaseData);

module.exports = router;
