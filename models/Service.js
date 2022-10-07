const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
