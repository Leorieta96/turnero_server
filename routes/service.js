const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authWithExpired } = require("../middleware/auth");
const { addServices, getServices } = require("../controllers/serviceController");

router.post(
  "/",
  authWithExpired,
  addServices
);

router.get("/", authWithExpired, getServices);

module.exports = router;
