const db = require("../config/db/setup");

const ForumModel = {
    checkUserByToken: (token, callback) => {
        db.query('SELECT * FROM forum_akses WHERE token = ?', [token], callback);
    },

    checkUser: (username, token, callback) => {
        const checkUserQuery = "SELECT * FROM forum_akses WHERE username = ? AND token = ?";
        db.query(checkUserQuery, [username, token], callback);
    },

    getForumDiskusiByToken: (token, callback) => {
        const sql = `
            SELECT * 
            FROM forum_diskusi 
            JOIN forum_akses ON forum_diskusi.username = forum_akses.username 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            WHERE forum_akses.token = ? 
            ORDER BY tgl_dibuat DESC
        `;
        db.query(sql, [token], callback);
    },

    getMainReplies: (idDiskusi, callback) => {
        const mainReply = `
            SELECT * 
            FROM user_in_diskusi 
            JOIN forum_akses ON user_in_diskusi.username = forum_akses.username 
            WHERE id_diskusi = ? 
            ORDER BY tanggal ASC
        `;
        db.query(mainReply, [idDiskusi], callback);
    },

    getSubReplies: (idInteract, callback) => {
        const subReply = `
            SELECT * 
            FROM user_reply_diskusi 
            JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username 
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
            JOIN forum_akses ON forum_diskusi.username = forum_akses.username 
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
            SELECT * 
            FROM forum_diskusi 
            JOIN forum_akses ON forum_diskusi.username = forum_akses.username 
            JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
            WHERE id_diskusi = ?
        `;
        db.query(sql, [idDiskusi], callback);
    },

    createForum: (username, gambar, judul, isi, id_kategori, callback) => {
        const createForumQuery = "INSERT INTO forum_diskusi (username, gambar, judul, isi, id_kategori) VALUES (?, ?, ?, ?, ?)";
        db.query(createForumQuery, [username, gambar, judul, isi, id_kategori], callback);
    },

    deleteForum: (id, callback) => {
        const deleteForumQuery = "DELETE FROM forum_diskusi WHERE id_diskusi = ?";
        db.query(deleteForumQuery, [id], callback);
    },

    createReply: (id_diskusi, username, isi, callback) => {
        const createReplyQuery = "INSERT INTO user_in_diskusi (id_diskusi, username, isi) VALUES (?, ?, ?)";
        db.query(createReplyQuery, [id_diskusi, username, isi], callback);
    },
    
    createSubReply: (id_interact, username, isi, callback) => {
        const createSubReplyQuery = "INSERT INTO user_reply_diskusi (id_interact, username, isi) VALUES (?, ?, ?)";
        db.query(createSubReplyQuery, [id_interact, username, isi], callback);
    },

    checkChildReplies: (id_interact, callback) => {
        const checkChildQuery = "SELECT * FROM user_reply_diskusi WHERE id_interact = ?";
        db.query(checkChildQuery, [id_interact], callback);
    },
    
    updateFirstReplyToDeleted: (id_interact, callback) => {
        const updateReplyQuery =
            "UPDATE user_in_diskusi SET isi = '[deleted]' WHERE id_interact = ?";
        db.query(updateReplyQuery, [id_interact], callback);
    },

    deleteFirstReply: (id_interact, callback) => {
        const deleteReplyQuery = "DELETE FROM user_in_diskusi WHERE id_interact = ?";
        db.query(deleteReplyQuery, [id_interact], callback);
    },

    checkUserForSecondReply: (id_reply, token, callback) => {
        const checkUserQuery =
            "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_reply = ? AND token = ?";
        db.query(checkUserQuery, [id_reply, token], callback);
    },

    deleteSecondReply: (id_reply, callback) => {
        const deleteReplyQuery = "DELETE FROM user_reply_diskusi WHERE id_reply = ?";
        db.query(deleteReplyQuery, [id_reply], callback);
    }
};

module.exports = ForumModel;