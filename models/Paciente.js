const mongoose = require("mongoose");

const PacienteSchema = mongoose.Schema({
  //dni _id
  dni: {
    type: Number,
    require: true,
    unique: true 
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  domicile: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    require: true,
    trim: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  social_coverage: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model("Paciente", PacienteSchema);
