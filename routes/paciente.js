const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authWithExpired } = require("../middleware/auth");
const pacienteController = require("../controllers/pacienteController");

// api/authWithExpired
router.post(
  "/",
  authWithExpired,
  [
    check("dni", "Agrega un dni valido").isNumeric(),
    check("name", "El nombre del paciente es obligatorio").notEmpty(),
    check("birthday", "El nombre del paciente es obligatorio").notEmpty(),
    check("domicile", "El nombre del paciente es obligatorio").notEmpty(),
    check("location", "El nombre del paciente es obligatorio").notEmpty(),
    check(
      "phone",
      "El número de telefono del paciente es obligatorio"
    ).isNumeric(),
    check(
      "family_phone",
      "El número de telefono del paciente es obligatorio"
    ).isNumeric(),
  ],
  pacienteController.addPaciente
);

router.get("/", authWithExpired, pacienteController.getPaciente);

router.put("/:id", authWithExpired, pacienteController.updatePaciente);

module.exports = router;
