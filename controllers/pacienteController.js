const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addPaciente = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      let paciente = await Paciente.findOne({ dni: req.body.dni });
      if (paciente) {
        return res
          .status(400)
          .json({ msg: "Ya existe paciente con el mismo DNI" });
      }
      paciente = new Paciente(req.body);
      await paciente.save();
      res.json({ paciente });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getPaciente = async (req, res) => {
  const { q } = req.query;
  let pacientes = null;
  console.log(`${new Date().toLocaleDateString()}: ${q}`)
  try {
    if (isNaN(q)) {
      pacientes = await Paciente.find({ $text: { $search: q } });
    } else {
      pacientes = await Paciente.find({ dni: q });
    }
    if (pacientes.length === 0)
      return res.status(500).json({ msg: "No existe Paciente" });
    res.json({ pacientes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const updatePaciente = req.body;
  try {
    const newPaciente = await Paciente.findByIdAndUpdate(id, updatePaciente, {
      new: true,
    });
    if (!newPaciente) {
      return res.json({ msg: "No existe" });
    }
    res.json({ newPaciente });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
