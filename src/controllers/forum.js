// forum.js

const ForumModel = require("../models/forumModel");

// --- HELPER FUNCTION UNTUK MENGHINDARI DUPLIKASI KODE ---
// Fungsi ini mengambil sekumpulan post, lalu melengkapinya dengan balasan dan jumlah balasan.
const attachRepliesToPosts = async (posts) => {
  const enrichedPosts = await Promise.all(
    posts.map(async (item) => {
      const mainReplies = await ForumModel.getMainReplies(item.id_diskusi);
      let replyCount = mainReplies.length;

      const enrichedMainReplies = await Promise.all(
        mainReplies.map(async (reply) => {
          const subReplies = await ForumModel.getSubReplies(reply.id_interact);
          replyCount += subReplies.length;

          const formattedSubReplies = subReplies.map((sub) => ({
            id_reply: sub.id_reply,
            username: sub.username,
            tanggal: sub.tanggal,
            isi: sub.isi,
          }));

          return {
            id_interact: reply.id_interact,
            username: reply.username,
            tanggal: reply.tanggal,
            isi: reply.isi,
            sub_replies: formattedSubReplies,
          };
        })
      );

      return {
        ...item,
        main_replies: enrichedMainReplies,
        jumlah_replies: replyCount,
      };
    })
  );
  return enrichedPosts;
};
// --- END OF HELPER FUNCTION ---


const getForumTerakhir = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const forumResults = await ForumModel.getForumDiskusiByID(user_id);
    
    const formattedResult = forumResults.map((item) => ({
      id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
      judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
      kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
    }));

    const finalResult = await attachRepliesToPosts(formattedResult);
    res.json(finalResult);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllForum = async (req, res) => {
  try {
    const results = await ForumModel.getAllForumDiskusi();
    
    const formattedResult = results.map((item) => ({
      id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
      judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
      kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
    }));

    const finalResult = await attachRepliesToPosts(formattedResult);
    res.json(finalResult);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getForumTerbaru = async (req, res) => {
    // Fungsi ini tampak identik dengan getAllForum, tapi hanya mengambil dari tabel forum dan kategori.
    // Jika tujuannya sama, bisa digabung. Jika berbeda, implementasinya di bawah.
    try {
        const results = await ForumModel.getForumTerbaru();
        const formattedResult = results.map(item => ({
            id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
            judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
            kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
        }));
        const finalResult = await attachRepliesToPosts(formattedResult);
        res.json(finalResult);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getForumTopDiskusi = async (req, res) => {
  try {
    const results = await ForumModel.getForumTopDiskusi();
    
    const formattedResult = results.map((item) => ({
      id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
      judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
      kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
    }));

    const finalResultWithReplies = await attachRepliesToPosts(formattedResult);

    const sortedResult = finalResultWithReplies.sort((a, b) => {
      const aScore = a.jumlah_pembaca + a.jumlah_replies;
      const bScore = b.jumlah_pembaca + b.jumlah_replies;
      return bScore - aScore;
    });

    res.json(sortedResult);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getForumByKategori = async (req, res) => {
    try {
        const results = await ForumModel.getForumByKategori(req.params.id);
        const formattedResult = results.map(item => ({
             id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
             judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
             kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
        }));
        const finalResult = await attachRepliesToPosts(formattedResult);
        res.json(finalResult);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getForumByKeyword = async (req, res) => {
    try {
        const results = await ForumModel.searchForumByKeyword(req.params.search);
        const formattedResult = results.map(item => ({
             id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
             judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca,
             kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
        }));
        const finalResult = await attachRepliesToPosts(formattedResult);
        res.json(finalResult);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getForumById = async (req, res) => {
    try {
        const idDiskusi = req.params.id;
        const results = await ForumModel.getForumById(idDiskusi);
        if (results.length === 0) {
            return res.status(404).json({ message: "Forum not found" });
        }
        
        await ForumModel.updateViewCount(idDiskusi);

        const formattedResult = results.map(item => ({
            id_diskusi: item.id_diskusi, username: item.username, tgl_dibuat: item.tgl_dibuat,
            gambar: item.gambar, judul: item.judul, isi: item.isi, jumlah_pembaca: item.jumlah_pembaca + 1, // +1 for current view
            kategori: { id_kategori: item.id_kategori, nama: item.nama_kategori },
        }));

        const finalResult = await attachRepliesToPosts(formattedResult);
        res.json(finalResult[0]); // Return as an object, not an array
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const createForum = async (req, res) => {
  try {
    const { judul, isi, id_kategori } = req.body;
    const gambar = req.file ? req.file.path.replace(/^public/, "") : null;
    const user_id = req.user.user_id;

    const result = await ForumModel.createForum(user_id, gambar, judul, isi, id_kategori);
    res.status(201).json({ message: "Diskusi added successfully", id_diskusi: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteForum = async (req, res) => {
  try {
    const { id } = req.params;
    await ForumModel.deleteForum(id);
    res.json({ message: "Diskusi deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createReply = async (req, res) => {
  try {
    const { id_reply, id_diskusi, id_interact, isi } = req.body;
    const user_id = req.user.user_id;

    if (id_interact === null) {
      await ForumModel.createReply(id_reply, id_diskusi, user_id, isi);
    } else {
      await ForumModel.createSubReply(id_reply, id_interact, user_id, isi);
    }
    res.status(201).json({ message: "Reply added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteFirstReply = async (req, res) => {
  try {
    const { id } = req.params;
    const childReplies = await ForumModel.checkChildReplies(id);

    if (childReplies.length > 0) {
      await ForumModel.updateFirstReplyToDeleted(id);
      res.json({ message: "Reply has children, content set to [deleted]" });
    } else {
      await ForumModel.deleteFirstReply(id);
      res.json({ message: "Reply deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteSecondReply = async (req, res) => {
  try {
    const { id } = req.params;
    await ForumModel.deleteSecondReply(id);
    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkHargaKomoditasProdusen = async (res) => {
    try {
        const result = await ForumModel.checkKomoditasHargaPasar();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
  getForumTerakhir, getAllForum, getForumTerbaru, getForumTopDiskusi,
  getForumByKategori, getForumByKeyword, getForumById, createForum,
  deleteForum, createReply, deleteFirstReply, deleteSecondReply,
  checkHargaKomoditasProdusen,
};