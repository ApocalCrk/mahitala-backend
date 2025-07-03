const db = require('../config/db/setup');
const { hashToken, verifyToken } = require('../utils/encryption');

const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const AuthModel = {
  async isUsernameTaken(username) {
    const results = await queryPromise('SELECT * FROM users WHERE username = ?', [username]);
    return results;
  },

  async createUser(data) {
    const { username, token } = data;
    const hashedToken = hashToken(token); 
    console.log('Username:', username);
    console.log('Hashed Token:', hashedToken);
    const results = await queryPromise('INSERT INTO users (username, token) VALUES (?, ?)', [username, hashedToken]);
    return results;
  },

  async getUserByUsername(username) {
    const results = await queryPromise('SELECT * FROM users WHERE username = ?', [username]);
    return results;
  },
  
  isTokenValid(token, storedToken) {
    return verifyToken(token, storedToken);
  },
};

module.exports = AuthModel;