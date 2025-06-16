// kategoriModel.js

const db = require('../config/db/setup');

// Helper untuk mengubah db.query menjadi Promise-based
const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const KategoriModel = {
  async getAllKategori() {
    // Menggabungkan dua query menjadi satu untuk efisiensi
    const sql = `
      SELECT 
        k.id_kategori, 
        k.nama_kategori, 
        k.gambar, 
        COUNT(fd.id_kategori) AS jumlah_diskusi
      FROM kategori k
      LEFT JOIN forum_diskusi fd ON k.id_kategori = fd.id_kategori
      GROUP BY k.id_kategori, k.nama_kategori, k.gambar`;
      
    const results = await queryPromise(sql);
    // Mengonversi hasil COUNT yang berupa string menjadi number
    return results.map(item => ({
        ...item,
        jumlah_diskusi: Number(item.jumlah_diskusi)
    }));
  },

  async getBestKategori() {
    const sql = `(SELECT kategori.id_kategori, kategori.nama_kategori, kategori.gambar, COUNT(forum_diskusi.id_kategori) AS jumlah_digunakan 
                  FROM kategori 
                  JOIN forum_diskusi ON kategori.id_kategori = forum_diskusi.id_kategori 
                  GROUP BY kategori.id_kategori 
                  ORDER BY RAND() LIMIT 3)
                  UNION ALL 
                  (SELECT kategori.id_kategori, kategori.nama_kategori, kategori.gambar, 0 AS jumlah_digunakan 
                  FROM kategori 
                  LEFT JOIN forum_diskusi ON kategori.id_kategori = forum_diskusi.id_kategori 
                  WHERE forum_diskusi.id_kategori IS NULL 
                  ORDER BY RAND() LIMIT 3)
                  LIMIT 3`;
    const result = await queryPromise(sql);
    return result.map((item) => ({
      id_kategori: item.id_kategori,
      nama: item.nama_kategori,
      gambar: item.gambar,
      jumlah_digunakan: item.jumlah_digunakan,
    }));
  },

  async getKategoriById(id) {
    const sql = `SELECT * FROM kategori WHERE id_kategori = ?`;
    const result = await queryPromise(sql, [id]);

    if (result.length === 0) {
      throw new Error("Kategori tidak ditemukan"); // Lemparkan error untuk ditangkap controller
    }

    // Mengembalikan objek tunggal, bukan array
    return {
        id_kategori: result[0].id_kategori,
        nama: result[0].nama_kategori,
        gambar: result[0].gambar,
    };
  }
};

module.exports = KategoriModel;