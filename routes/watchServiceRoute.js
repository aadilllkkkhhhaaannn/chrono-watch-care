const express = require("express");
const {
  getComplaints,
  raiseComplaints,
  getComplaint,
  closeComplaint,
} = require("../Controller/watchServiceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getComplaints);
router.post("/", protect, raiseComplaints);
router.get("/:id", getComplaint);
router.put("/:id", protect, closeComplaint);
router.use("/:wid/note", require("./noteRoutes"));

module.exports = router;
