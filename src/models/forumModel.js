const db = require("../config/db/setup");
const fs = require("fs").promises; // Menggunakan fs.promises untuk async/await
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
const { unlinkImage } = require("../utils/image_processing");

dotenv.config();

// Helper untuk mengubah db.query menjadi Promise-based
const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Helper untuk mengubah unlinkImage menjadi Promise-based
const unlinkImagePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) return resolve(); // Jika tidak ada gambar, langsung resolve
    unlinkImage(filePath, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};


const ForumModel = {
  async checkUserByID(user_id) {
    return await queryPromise("SELECT * FROM users WHERE user_id = ?", [user_id]);
  },

  async checkUser(username, user_id) {
    const sql = "SELECT * FROM users WHERE username = ? AND user_id = ?";
    return await queryPromise(sql, [username, user_id]);
  },

  async getForumDiskusiByID(user_id) {
    const sql = `SELECT * FROM forum_diskusi 
                 JOIN users ON forum_diskusi.user_id = users.user_id 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
                 WHERE users.user_id = ? ORDER BY tgl_dibuat DESC`;
    return await queryPromise(sql, [user_id]);
  },

  async getMainReplies(idDiskusi) {
    const sql = `SELECT * FROM user_in_diskusi 
                 JOIN users ON user_in_diskusi.user_id = users.user_id 
                 WHERE id_diskusi = ? ORDER BY tanggal ASC`;
    return await queryPromise(sql, [idDiskusi]);
  },

  async getSubReplies(idInteract) {
    const sql = `SELECT * FROM user_reply_diskusi 
                 JOIN users ON user_reply_diskusi.user_id = users.user_id 
                 WHERE id_interact = ? ORDER BY tanggal ASC`;
    return await queryPromise(sql, [idInteract]);
  },

  async updateViewCount(idDiskusi) {
    const sql = "UPDATE forum_diskusi SET jumlah_pembaca = jumlah_pembaca + 1 WHERE id_diskusi = ?";
    return await queryPromise(sql, [idDiskusi]);
  },

  async getAllForumDiskusi() {
    const sql = `SELECT * FROM forum_diskusi 
                 JOIN users ON forum_diskusi.user_id = users.user_id 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori`;
    return await queryPromise(sql);
  },

  async getForumTerbaru() {
    const sql = `SELECT * FROM forum_diskusi 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
                 JOIN users ON forum_diskusi.user_id = users.user_id
                 ORDER BY tgl_dibuat DESC`;
    return await queryPromise(sql);
  },

  async getForumTopDiskusi() {
    const sql = `SELECT * FROM forum_diskusi 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori
                 JOIN users ON forum_diskusi.user_id = users.user_id`;
    return await queryPromise(sql);
  },

  async getForumByKategori(idKategori) {
    const sql = `SELECT * FROM forum_diskusi 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori
                 JOIN users ON forum_diskusi.user_id = users.user_id 
                 WHERE forum_diskusi.id_kategori = ?`;
    return await queryPromise(sql, [idKategori]);
  },

  async searchForumByKeyword(keyword) {
    const sql = "SELECT * FROM forum_diskusi JOIN users ON forum_diskusi.user_id = users.user_id WHERE judul LIKE ?";
    return await queryPromise(sql, [`%${keyword}%`]);
  },

  async getForumById(idDiskusi) {
    const sql = `SELECT *, forum_diskusi.gambar AS gambar FROM forum_diskusi 
                 JOIN users ON forum_diskusi.user_id = users.user_id 
                 JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori 
                 WHERE id_diskusi = ?`;
    return await queryPromise(sql, [idDiskusi]);
  },

  async createForum(user_id, gambar, judul, isi, id_kategori) {
    const sql = "INSERT INTO forum_diskusi (user_id, gambar, judul, isi, id_kategori) VALUES (?, ?, ?, ?, ?)";
    return await queryPromise(sql, [user_id, gambar, judul, isi, id_kategori]);
  },

  async deleteForum(id) {
    const checkSql = "SELECT gambar FROM forum_diskusi WHERE id_diskusi = ?";
    const forum = await queryPromise(checkSql, [id]);

    if (forum.length === 0) {
      throw new Error("Forum not found");
    }

    await unlinkImagePromise(forum[0].gambar);

    const deleteSql = "DELETE FROM forum_diskusi WHERE id_diskusi = ?";
    return await queryPromise(deleteSql, [id]);
  },

  async createReply(id_interact, id_diskusi, user_id, isi) {
    const sql = "INSERT INTO user_in_diskusi (id_interact, id_diskusi, user_id, isi) VALUES (?, ?, ?, ?)";
    return await queryPromise(sql, [id_interact, id_diskusi, user_id, isi]);
  },

  async createSubReply(id_reply, id_interact, user_id, isi) {
    const sql = "INSERT INTO user_reply_diskusi (id_reply, id_interact, user_id, isi) VALUES (?, ?, ?, ?)";
    return await queryPromise(sql, [id_reply, id_interact, user_id, isi]);
  },

  async checkChildReplies(id_interact) {
    const sql = "SELECT * FROM user_reply_diskusi WHERE id_interact = ?";
    return await queryPromise(sql, [id_interact]);
  },

  async updateFirstReplyToDeleted(id_interact) {
    const sql = "UPDATE user_in_diskusi SET isi = '[deleted]' WHERE id_interact = ?";
    return await queryPromise(sql, [id_interact]);
  },

  async deleteFirstReply(id_interact) {
    const sql = "DELETE FROM user_in_diskusi WHERE id_interact = ?";
    return await queryPromise(sql, [id_interact]);
  },

  async deleteSecondReply(id_reply) {
    const sql = "DELETE FROM user_reply_diskusi WHERE id_reply = ?";
    return await queryPromise(sql, [id_reply]);
  },
  
  async checkKomoditasHargaPasar() {
    const API_URL = process.env.API_URL_KOMODITAS_HARGA_PASAR;
    const CACHE_FILE = path.join(__dirname, "../cache/komoditas_cache.json");
    const TTL = 60 * 60 * 1000; // 1 jam

    try {
        // fs.promises.stat is fine here because it's fast and we need to wait for it.
        const stats = await fs.promises.stat(CACHE_FILE);
        const isCacheValid = (Date.now() - stats.mtimeMs) < CACHE_TTL_MS;

        if (isCacheValid) {
            console.log("Serving komoditas from valid file cache.");
            const rawData = await fs.promises.readFile(CACHE_FILE, "utf-8");
            return JSON.parse(rawData).data;
        }
    } catch (err) {
        // This is expected if the file doesn't exist.
        if (err.code === 'ENOENT') {
            console.log("Cache file not found. Fetching from API.");
        } else {
            console.error("Error checking cache file stats:", err);
        }
    }

    // --- 2. If cache is invalid or missing, fetch from API ---
    try {
        console.log(`Fetching fresh data from: ${API_URL}`);
        const response = await axios.get(API_URL, { timeout: 15000 }); // 15-second timeout

        // Map the data to the desired format
        const komoditas = response.data.data.map((item) => ({
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
            gambar: item.background,
        }));

        // --- 3. THE FIX: Write to cache in the background (NON-BLOCKING) ---
        const cacheData = {
            timestamp: Date.now(),
            data: komoditas
        };
        
        // We use the callback version of writeFile. This tells Node.js to start writing
        // but NOT to wait for it to finish. The function continues immediately.
        fs.writeFile(CACHE_FILE, JSON.stringify(cacheData), "utf-8", (err) => {
            if (err) {
                // If writing fails, we just log it. The user has already received their data.
                console.error("Error writing to cache file in background:", err);
            } else {
                console.log("Cache file has been updated in the background.");
            }
        });

        // --- 4. Return the fresh data to the user IMMEDIATELY ---
        console.log("Returning fresh data to the user while cache writes in background.");
        return komoditas;

    } catch (error) {
        console.error("Fatal error fetching komoditas harga pasar from API:", error.message);
        // If the API call fails, we must throw an error so the calling function knows about it.
        throw error;
    }
  },
};

module.exports = ForumModel;