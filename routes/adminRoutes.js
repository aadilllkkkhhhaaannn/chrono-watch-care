const express = require("express");
const adminProtect = require("../middleware/adminMiddleware");
const {
  getUsers,
  getWatches,
  getNotes,
  updatedWatches,
} = require("../Controller/adminController");

const router = express.Router();
router.post("/")
router.get("/users", getUsers);
router.get("/watches", adminProtect, getWatches);
router.get("/notes", adminProtect, getNotes);
router.put("/watches/:id", adminProtect, updatedWatches);

module.exports = router;
