const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authWithExpired } = require("../middleware/auth");
const { addTurn, getTurn } = require("../controllers/turnController");

// api/auth
router.post(
  "/",
  authWithExpired,
  addTurn
);

router.get("/", authWithExpired, getTurn);

router.get("/:id", authWithExpired, getTurn);

module.exports = router;
