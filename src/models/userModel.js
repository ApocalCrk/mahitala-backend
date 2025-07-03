const db = require("../config/db/setup");

const UserModel = {
  async getAllUsers() {
    const sql = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = UserModel;
