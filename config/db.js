const mongoose = require("mongoose");
const config = require('./var');

/*require("dotenv").config({ path: "variables.env" });*/

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_MONGO);
    console.log("==============");
    console.log("  DB Connect");
    console.log("==============");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;