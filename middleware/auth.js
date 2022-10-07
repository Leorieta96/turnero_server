const jwt = require("jsonwebtoken");
const config = require('../config/var');

exports.auth = (req, res, next) => {
  //leer token del header
  const token = req.header("x-auth-token");
  //revisar si hay token
  if (!token) {
    return res.status(401).json({ msg: "Inicie sesión" });
  }
  //validar token
  try {
    const cifrado = jwt.verify(token, config.SECRETA);
    req.user = cifrado.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Sesión expirada" });
  }
};

exports.authWithExpired = (req, res, next) => {
  //leer token del header
  //revisar si hay token
  try {
    const token = req.header("x-auth-token");
    if (token) {
      const cifrado = jwt.verify(token, config.SECRETA);
      req.user = cifrado.user;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return next();
  }
};
