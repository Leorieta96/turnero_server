const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/authController");
const { auth } = require("../middleware/auth");

// api/auth
router.post(
  "/login",
  [
    check("dni", "Agrega un dni valido").isNumeric(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
      max: 100,
    }),
  ],
  userController.login
);

router.post(
  "/signup",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("dni", "Agrega un email valido").isNumeric(),
    check("password", "El password debe ser miimo de 6 caracteres").isLength({
      min: 6,
      max: 100,
    }),
  ],
  userController.signup
);

router.get("/", auth, userController.authenticateUser);

module.exports = router;
