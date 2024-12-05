const db = require('../config/db/setup');

const KategoriModel = {
  getAllKategori: (callback) => {
    const sql = "SELECT * FROM kategori";
    db.query(sql, (err, result) => {
      if (err) return callback(err);

      const countDiskusi = "SELECT id_kategori, COUNT(id_kategori) AS jumlah_diskusi FROM forum_diskusi GROUP BY id_kategori";
      db.query(countDiskusi, (err, countResult) => {
        if (err) return callback(err);

        const formattedResult = result.map((item) => {
          const count = countResult.find((countItem) => countItem.id_kategori === item.id_kategori);
          return {
            id_kategori: item.id_kategori,
            nama: item.nama_kategori,
            gambar: item.gambar,
            jumlah_diskusi: count ? count.jumlah_diskusi : 0,
          };
        });
        callback(null, formattedResult);
      });
    });
  },

  getBestKategori: (callback) => {
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

    db.query(sql, (err, result) => {
      if (err) return callback(err);

      const formattedResult = result.map((item) => ({
        id_kategori: item.id_kategori,
        nama: item.nama_kategori,
        gambar: item.gambar,
        jumlah_digunakan: item.jumlah_digunakan,
      }));

      callback(null, formattedResult);
    });
  },

  getKategoriById: (id, callback) => {
    const sql = `SELECT * FROM kategori WHERE id_kategori = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);

      if (result.length === 0) {
        return callback({ message: "Kategori tidak ditemukan" });
      }

      const formattedResult = result.map((item) => ({
        id_kategori: item.id_kategori,
        nama: item.nama_kategori,
        gambar: item.gambar,
      }));

      callback(null, formattedResult);
    });
  }
};

module.exports = KategoriModel;
