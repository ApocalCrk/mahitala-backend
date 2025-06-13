const db = require('../config/db/setup');

const FieldModel = {
    getFieldByUserID: (user_id, callback) => {
        const sql = `SELECT * FROM user_field_map WHERE user_id = ?`;
        db.query(sql, [user_id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createField: (data, callback) => {
        const sql = `INSERT INTO user_field_map 
            (id_field, user_id, nama_lahan, jenis_tanah, id_tanaman, coords, luas_lahan, tanggal_tanam, estimasi_panen)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            null,
            data.user_id,
            data.nama_lahan,
            data.jenis_tanah,
            data.id_tanaman,
            data.coords,
            data.luas_lahan,
            data.tanggal_tanam,
            data.estimasi_panen
        ], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateField: (id_field, data, callback) => {
        const sql = `UPDATE user_field_map SET
            nama_lahan = ?,
            jenis_tanah = ?,
            id_tanaman = ?,
            coords = ?,
            luas_lahan = ?,
            tanggal_tanam = ?,
            estimasi_panen = ?
            WHERE id_field = ?`;
        db.query(sql, [
            data.nama_lahan,
            data.jenis_tanah,
            data.id_tanaman,
            data.coords,
            data.luas_lahan,
            data.tanggal_tanam,
            data.estimasi_panen,
            id_field
        ], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteField: (id_field, user_id, callback) => {
        const sql = `DELETE FROM user_field_map WHERE id_field = ? AND user_id = ?`;
        db.query(sql, [id_field, user_id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    getFieldById: (id, callback) => {
        const sql = `SELECT * FROM user_field_map WHERE id_field = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    },

    getCropData: (callback) => {
        const sql = `SELECT * FROM kondisi_tanaman WHERE label != 'Tidak Ada'`;
        db.query(sql, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    getCropById: (id, callback) => {
        const sql = `SELECT * FROM kondisi_tanaman WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    },
};

module.exports = FieldModel;
