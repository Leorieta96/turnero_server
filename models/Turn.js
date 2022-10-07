const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  time: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
  },
});

