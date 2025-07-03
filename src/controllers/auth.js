const AuthModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, token } = req.body;
    console.log(req.body);

    const existingUser = await AuthModel.isUsernameTaken(username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username telah terdaftar" });
    }

    const dbResult = await AuthModel.createUser({ username, token });

    const user = { user_id: dbResult.insertId, username, token };
    const jwtToken = jwt.sign(user, JWT_SECRET);

    res.status(200).json({
      message: "Registrasi berhasil",
      token: jwtToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server saat registrasi" });
  }
};

const login = async (req, res) => {
  try {
    const { username, token } = req.body;

    const result = await AuthModel.getUserByUsername(username);
    if (result.length === 0) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }

    const user = result[0];

    if (AuthModel.isTokenValid(token, user.token)) {
      const payload = { user_id: user.user_id, username };
      const jwtToken = jwt.sign(payload, JWT_SECRET);
      res.json({
        message: "Login berhasil",
        token: jwtToken
      });
    } else {
      res.status(400).json({ message: "Token tidak valid" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server saat login" });
  }
};

const checkUser = async (req, res) => {
  try {
    const username = req.user.username; 
    const result = await AuthModel.getUserByUsername(username);

    if (result.length === 0) {
      return res.status(404).json({ message: "Username tidak ditemukan" });
    }

    const user = result[0];
    res.json({
      user_id: user.user_id,
      username: user.username,
      token: user.token,
    });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { register, login, checkUser };