const db = require('../config/db/setup');
const { hashToken, verifyToken } = require('../utils/encryption');

const AuthModel = {
  isUsernameTaken: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },

  createUser: (data, callback) => {
    const { username, token } = data;
    const hashedToken = hashToken(token);
    db.query('INSERT INTO users (username, token) VALUES (?, ?)', [username, hashedToken], callback);
  },

  getUserByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },
  
  isTokenValid: (token, storedToken) => {
    return verifyToken(token, storedToken);
  },
};

module.exports = AuthModel;
