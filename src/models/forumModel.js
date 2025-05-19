const db = require("../config/db/setup");
const axios = require("axios");
const dotenv = require("dotenv");
const { unlinkImage } = require("../utils/image_processing");

dotenv.config();

const ForumModel = {
  checkUserByID: (user_id, callback) => {
    db.query("SELECT * FROM users WHERE user_id = ?", [user_id], callback);
  },

  checkUser: (username, user_id, callback) => {
    const checkUserQuery =
      "SELECT * FROM users WHERE username = ? AND user_id = ?";
    db.query(checkUserQuery, [username, user_id], callback);
  },

  getForumDiskusiByID: (user_id, callback) => {
    const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN users ON forum_diskusi.user_id = users.user_id 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            WHERE users.user_id = ? 
            ORDER BY tgl_dibuat DESC
        `;
    db.query(sql, [user_id], callback);
  },

  getMainReplies: (idDiskusi, callback) => {
    const mainReply = `
            SELECT * 
            FROM user_in_diskusi 
            JOIN users ON user_in_diskusi.user_id = users.user_id 
            WHERE id_diskusi = ? 
            ORDER BY tanggal ASC
        `;
    db.query(mainReply, [idDiskusi], callback);
  },

  getSubReplies: (idInteract, callback) => {
    const subReply = `
            SELECT * 
            FROM user_reply_diskusi 
            JOIN users ON user_reply_diskusi.user_id = users.user_id 
            WHERE id_interact = ? 
            ORDER BY tanggal ASC
        `;
    db.query(subReply, [idInteract], callback);
  },

  updateViewCount: (idDiskusi, callback) => {
    const updateJumlahPembaca = `
            UPDATE forum_diskusi 
            SET jumlah_pembaca = jumlah_pembaca + 1 
            WHERE id_diskusi = ?
        `;
    db.query(updateJumlahPembaca, [idDiskusi], callback);
  },

  getAllForumDiskusi: (callback) => {
    const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN users ON forum_diskusi.user_id = users.user_id 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori
        `;
    db.query(sql, callback);
  },

  getForumTerbaru: (callback) => {
    const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            ORDER BY tgl_dibuat DESC
        `;
    db.query(sql, callback);
  },

  getForumTopDiskusi: (callback) => {
    const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori
            join users ON forum_diskusi.user_id = users.user_id
        `;
    db.query(sql, callback);
  },

  getForumByKategori: (idKategori, callback) => {
    const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            WHERE forum_diskusi.id_kategori = ?
        `;
    db.query(sql, [idKategori], callback);
  },

  searchForumByKeyword: (keyword, callback) => {
    const sql = "SELECT * FROM forum_diskusi WHERE judul LIKE ?";
    db.query(sql, [keyword], callback);
  },

  getForumById: (idDiskusi, callback) => {
    const sql = `
            SELECT *, forum_diskusi.gambar AS gambar
            FROM forum_diskusi 
            JOIN users ON forum_diskusi.user_id = users.user_id 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            WHERE id_diskusi = ?
        `;
    db.query(sql, [idDiskusi], callback);
  },

  createForum: (user_id, gambar, judul, isi, id_kategori, callback) => {
    const createForumQuery =
      "INSERT INTO forum_diskusi (user_id, gambar, judul, isi, id_kategori) VALUES (?, ?, ?, ?, ?)";
    db.query(
      createForumQuery,
      [user_id, gambar, judul, isi, id_kategori],
      callback
    );
  },

  deleteForum: (id, callback) => {
    const checkForumIsExist = "SELECT * FROM forum_diskusi WHERE id_diskusi = ?";

    db.query(checkForumIsExist, [id], (err, result) => {
        if (err) return callback(err);

        if (result.length === 0) {
            return callback(new Error("Forum not found"));
        }

        unlinkImage(result[0].gambar, (err) => {
            if (err) return callback(err);

            const deleteForumQuery = "DELETE FROM forum_diskusi WHERE id_diskusi = ?";
            db.query(deleteForumQuery, [id], callback);
        });
    });
  },

  createReply: (id_interact, id_diskusi, user_id, isi, callback) => {
    const createReplyQuery =
      "INSERT INTO user_in_diskusi (id_interact, id_diskusi, user_id, isi) VALUES (?, ?, ?, ?)";
    db.query(
      createReplyQuery,
      [id_interact, id_diskusi, user_id, isi],
      callback
    );
  },

  createSubReply: (id_reply, id_interact, user_id, isi, callback) => {
    const createSubReplyQuery =
      "INSERT INTO user_reply_diskusi (id_reply, id_interact, user_id, isi) VALUES (?, ?, ?, ?)";
    db.query(
      createSubReplyQuery,
      [id_reply, id_interact, user_id, isi],
      callback
    );
  },

  checkChildReplies: (id_interact, callback) => {
    const checkChildQuery =
      "SELECT * FROM user_reply_diskusi WHERE id_interact = ?";
    db.query(checkChildQuery, [id_interact], callback);
  },

  updateFirstReplyToDeleted: (id_interact, callback) => {
    const updateReplyQuery =
      "UPDATE user_in_diskusi SET isi = '[deleted]' WHERE id_interact = ?";
    db.query(updateReplyQuery, [id_interact], callback);
  },

  deleteFirstReply: (id_interact, callback) => {
    const deleteReplyQuery =
      "DELETE FROM user_in_diskusi WHERE id_interact = ?";
    db.query(deleteReplyQuery, [id_interact], callback);
  },

  checkUserForSecondReply: (id_reply, user_id, callback) => {
    const checkUserQuery =
      "SELECT * FROM user_reply_diskusi JOIN users ON user_reply_diskusi.user_id = users.user_id WHERE id_reply = ? AND user_id = ?";
    db.query(checkUserQuery, [id_reply, user_id], callback);
  },

  deleteSecondReply: (id_reply, callback) => {
    const deleteReplyQuery =
      "DELETE FROM user_reply_diskusi WHERE id_reply = ?";
    db.query(deleteReplyQuery, [id_reply], callback);
  },

  checkKomoditasHargaPasar: (callback) => {
    const API_KOMODITAS_HARGA_PASAR = process.env.API_URL_KOMODITAS_HARGA_PASAR;
    axios
      .get(API_KOMODITAS_HARGA_PASAR)
      .then((response) => {
        const data = response.data.data;
        const komoditas = data.map((item) => ({
          id: item.id,
          nama: item.name,
          satuan: item.satuan,
          hari_ini: item.today,
          kemarin: item.yesterday,
          tanggal_kemarin: item.yesterday_date,
          gap: item.gap,
          gap_persen: item.gap_percentage,
          gap_change: item.gap_change,
          gap_color: item.gap_color,
          gambar: item.background
        }));
        callback(null, komoditas);
      })
      .catch((error) => {
        console.error("Error fetching komoditas harga pasar:", error);
        callback(error, null);
      });
  },
};

module.exports = ForumModel;
