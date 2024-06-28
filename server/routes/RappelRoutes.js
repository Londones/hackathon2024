const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const authenticateToken = require("../middleware/authmiddleware");

const { getUserRappels } = require("../controllers/RappelController");

const { updateUserRappel } = require("../controllers/RappelController");

router.get("/:userId", authenticateToken, getUserRappels);

router.put("/:userId", authenticateToken, updateUserRappel);

module.exports = router;
