const Turn = require("../models/Turn");
const Paciente = require("../models/Paciente");
const Day = require("../models/Day");
const { validationResult } = require("express-validator");

exports.addTurn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const { day, turn, paciente: dataPaciente } = req.body;
      const { user } = req;
      let paciente = await Paciente.findOne({ dni: dataPaciente.dni });
      let dayOrigin = await Day.findOne({ _id: day._id });
      if (!paciente) {
        paciente = new Paciente(dataPaciente);
        await paciente.save()
      }
      const turnUpdate = {
        ...turn,
        id_paciente: paciente._id
      };
      const index = dayOrigin.turns.findIndex((e) => e._id === turnUpdate._id);
      console.log(index);
      const turnsUpdate = dayOrigin.turns;
      turnsUpdate[index] = turnUpdate;
      let dayUpdate = {
        ...dayOrigin,
        turns: turnsUpdate
      }
      console.log(dayUpdate);
      await Day.findByIdAndUpdate(dayOrigin._id, dayUpdate, { new: true })
      dayUpdate = {
        ...dayOrigin,
        turns: turnUpdate
      }
      const result = await Day.findById(day._id).populate('turns.id_paciente');
      res.json({ day: user ? result : dayUpdate, paciente, turn: turnUpdate });
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getTurn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const { query: { code, dni } } = req;
    const day = await Day.findOne({ code }).populate('turns.id_paciente').then((data) => {
      if (data) {
        return {
          ...data._doc,
          turns: data._doc.turns.filter((d) => d.id_paciente !== undefined && d.id_paciente.dni !== dni)
        };
      }
      return [];
    });
    res.json(day);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
