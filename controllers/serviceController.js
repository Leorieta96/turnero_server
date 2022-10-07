const Service = require("../models/Service");
const { validationResult } = require("express-validator");

exports.addServices = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const Service = await Service.findById(req.body.id_Service);

      if (!Service) {
        return res.status(400).json({ msg: "No existe tratamiento" });
      }
      await Service.save();
      res.json(Service);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getServices = async (req, res) => {
  const { id_Service } = req.query;
  try {
    const Service = await Service.findById(id_Service);
    if (!Service) {
      return res.status(400).json({ msg: "No existe tratamiento" });
    }

    res.json(Service);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
