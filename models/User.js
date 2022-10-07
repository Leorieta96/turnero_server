const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    /* 1: medico, 2: enfermero, 3: salud mental 4: rayos*/
    type: [String],
    required: true,
  },
  to_register: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
