const mongoose = require("mongoose");
const Turn = require("./Turn");

const DaySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uniqued: true,
  },
  turns: {
    type: [Turn],
    required: true,
  },
  id_service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
});

module.exports = mongoose.model("Day", DaySchema);
