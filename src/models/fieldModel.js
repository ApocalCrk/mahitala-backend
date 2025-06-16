// fieldModel.js

const db = require('../config/db/setup');

// Helper untuk mengubah db.query menjadi berbasis Promise
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

const FieldModel = {
    async getFieldByUserID(user_id) {
        const sql = `SELECT * FROM user_field_map WHERE user_id = ?`;
        return await queryPromise(sql, [user_id]);
    },

    async createField(data) {
        const sql = `INSERT INTO user_field_map 
            (id_field, user_id, nama_lahan, jenis_tanah, id_tanaman, coords, luas_lahan, tanggal_tanam, estimasi_panen)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            null, data.user_id, data.nama_lahan, data.jenis_tanah,
            data.id_tanaman, data.coords, data.luas_lahan,
            data.tanggal_tanam, data.estimasi_panen
        ];
        return await queryPromise(sql, params);
    },

    async updateField(id_field, data) {
        const sql = `UPDATE user_field_map SET
            nama_lahan = ?, jenis_tanah = ?, id_tanaman = ?,
            coords = ?, luas_lahan = ?, tanggal_tanam = ?, estimasi_panen = ?
            WHERE id_field = ?`;
        const params = [
            data.nama_lahan, data.jenis_tanah, data.id_tanaman,
            data.coords, data.luas_lahan, data.tanggal_tanam,
            data.estimasi_panen, id_field
        ];
        return await queryPromise(sql, params);
    },

    async deleteField(id_field, user_id) {
        const sql = `DELETE FROM user_field_map WHERE id_field = ? AND user_id = ?`;
        return await queryPromise(sql, [id_field, user_id]);
    },

    async getFieldById(id) {
        const sql = `SELECT * FROM user_field_map WHERE id_field = ?`;
        const result = await queryPromise(sql, [id]);
        return result[0]; // Mengembalikan objek pertama atau undefined, sesuai logika awal
    },

    async getCropData() {
        const sql = `SELECT * FROM kondisi_tanaman WHERE label != 'Tidak Ada'`;
        return await queryPromise(sql);
    },

    async getCropById(id) {
        const sql = `SELECT * FROM kondisi_tanaman WHERE id = ?`;
        const result = await queryPromise(sql, [id]);
        return result[0]; // Mengembalikan objek pertama atau undefined, sesuai logika awal
    },
};

module.exports = FieldModel;