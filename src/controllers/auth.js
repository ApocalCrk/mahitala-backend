const AuthModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = (req, res) => {
  const { username, token } = req.body;

  AuthModel.isUsernameTaken(username, (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Username telah terdaftar" });
    }

    AuthModel.createUser({ username, token }, (err, dbResult) => {
      if (err) {
        return res.status(500).json({ message: "Error: Creating user error" });
      }

      const user = { user_id: dbResult.insertId, username, token };
      const jwtToken = jwt.sign(user, JWT_SECRET);

      res.status(200).json({
        message: "Registrasi berhasil",
        token: jwtToken
      });
    });
  });
};

const login = (req, res) => {
  const { username, token } = req.body;

  AuthModel.getUserByUsername(username, (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }

    const user = result[0];
    if (AuthModel.isTokenValid(token, user.token)) {
      const payload = { user_id: user.user_id, username };
      const jwtToken = jwt.sign(payload, JWT_SECRET);
      res.json({
        message: "Login berhasil",
        token: jwtToken,
        user: {
          user_id: user.user_id,
          username: user.username,
          token: user.token,
        },
      });
    } else {
      res.status(400).json({ message: "Token tidak valid" });
    }
  });
};

const checkUser = (req, res) => {
  const username = req.user.username;
  AuthModel.getUserByUsername(username, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }
    const user = result[0];
    res.json({
      user_id: user.user_id,
      username: user.username,
      token: user.token,
    });
  });
};

module.exports = { register, login, checkUser };
