const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('../config/var');


exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { dni, password } = req.body;

  try {
    const user = await User.findOne({ dni });
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    if (!user.to_register) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    const passCorrecto = await bcryptjs.compare(password, user.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      config.SECRETA,
      {
        expiresIn: 21600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hubo un error interno" });
  }
};

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      let user = await User.findOne({ dni: req.body.dni });
      if (user) {
        return res.status(400).json({ msg: "El usuario ya existe" });
      }
      user = new User(req.body);
      //hash
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      await user.save();

      const payload = {
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
      };
      //crear y firmar jwt
      /* jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 21600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      ); */
      res.json({ msg: "Usuario creado con exito" });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user.to_register) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
