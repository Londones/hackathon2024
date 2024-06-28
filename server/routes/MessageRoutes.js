const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const authenticateToken = require("../middleware/authmiddleware");

const { getAllUserMessages } = require("../controllers/MessageController");

router.get("/:userId", authenticateToken, getAllUserMessages);

module.exports = router;
