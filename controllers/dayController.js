const Day = require("../models/Day");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');

exports.addDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const { date, id_service } = req.body;
    const day = await Day.findOne({ date, id_service });
    let newDay = null;
    if (!day) {
      newDay = new Day({ ...req.body, code: uuidv4().slice(0, 5) });
      await newDay.save();
    } else {
      newDay = await Day.findOneAndUpdate({ id: day._id }, { turns: [...day.turns, ...req.body.turns] }, { new: true }).populate('turns.id_paciente');
    }
    res.status(200).json(newDay);
  } catch (e) {
    console.log(e);
    res.status(500).send("Hubo un error");
  }
};

exports.getDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const { user, query: { date, id_service } } = req;
    const day = await Day.findOne({ date, id_service }).populate('turns.id_paciente').then((data) => {
      if (user) {
        return data;
      } else {
        return data ? {
          ...data._doc,
          turns: data.turns.filter((d) => d.id_paciente === undefined)
        } : [];
      }
    });
    res.json(day);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.updateDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const { id } = req.params;
    const { turns } = req.body;
    return Day.findByIdAndUpdate(id, { turns }, { new: true }).populate('turns.id_paciente').then(day =>
      res.status(200).json(day)
    ).catch(e => {
      console.log(e);
      return res.status(500).json({ msg: "Hubo un error" });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Hubo un error" });
  }
};
