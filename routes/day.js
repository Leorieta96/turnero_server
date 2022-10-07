const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authWithExpired } = require("../middleware/auth");
const dayController = require("../controllers/dayController");

// api/auth
router.post(
  "/",
  authWithExpired,
  dayController.addDay
);

router.get("/", authWithExpired, dayController.getDay);

router.put("/:id", authWithExpired, dayController.updateDay);

module.exports = router;
