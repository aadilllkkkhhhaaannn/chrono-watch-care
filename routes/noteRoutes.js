const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getNotes, addNotes } = require("../Controller/noteController");

const router = express.Router({ mergeParams: true });

router.get("/", protect, getNotes);
router.post("/", protect, addNotes);

module.exports = router;
