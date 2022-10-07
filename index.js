const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require('./config/var');
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;

const app = express();

//db
connectDB();

//allow cors
app.use(cors())

//
app.use(express.json({ extend: true }));
app.set("view engine", "ejs");

//routes
app.use('/api',require('./routes/router'));

var server_port = config.PORT;
var server_host = config.HOST;

app.listen(server_port, server_host, () => {
  console.log(
    `El servidor esta funcionando en el puerto ${server_port}, en el servidor ${server_host}`
  );
});
