const db = require("../config/db/setup");
const ForumModel = require('../models/forumModel');

const getForumTerakhir = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    ForumModel.checkUserByToken(token, (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }

      ForumModel.getForumDiskusiByToken(token, (err, forumResults) => {
        if (err) return res.status(500).send(err);

        const formattedResult = forumResults.map((item) => ({
          id_diskusi: item.id_diskusi,
          username: item.username,
          tgl_dibuat: item.tgl_dibuat,
          gambar: item.gambar,
          judul: item.judul,
          isi: item.isi,
          jumlah_pembaca: item.jumlah_pembaca,
          kategori: {
            id_kategori: item.id_kategori,
            nama: item.nama_kategori,
            gambar: item.gambar,
          },
        }));

        const promises = formattedResult.map((item) => {
          return new Promise((resolve, reject) => {
            ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
              if (err) return reject(err);

              let replyCount = mainReplies.length;
              const mainReplyPromises = mainReplies.map((reply) => {
                return new Promise((resolveSub, rejectSub) => {
                  ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                    if (err) return rejectSub(err);

                    replyCount += subReplies.length;
                    const formattedReply = {
                      id_interact: reply.id_interact,
                      username: reply.username,
                      tanggal: reply.tanggal,
                      isi: reply.isi,
                    };

                    const formattedSubReplies = subReplies.map((subReply) => ({
                      id_reply: subReply.id_reply,
                      username: subReply.username,
                      tanggal: subReply.tanggal,
                      isi: subReply.isi,
                    }));

                    formattedReply.sub_replies = formattedSubReplies;
                    resolveSub(formattedReply);
                  });
                });
              });

              Promise.all(mainReplyPromises)
                .then((completedMainReplies) => {
                  item.main_replies = completedMainReplies;
                  item.jumlah_replies = replyCount;
                  resolve(item);
                })
                .catch(reject);
            });
          });
        });

        Promise.all(promises)
          .then((finalResult) => res.json(finalResult))
          .catch((err) => res.status(500).send(err));
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllForum = async (req, res) => {
  try {
    ForumModel.getAllForumDiskusi((err, result) => {
      if (err) return res.status(500).send(err);

      const formattedResult = result.map((item) => ({
        id_diskusi: item.id_diskusi,
        user: {
          username: item.username
        },
        tgl_dibuat: item.tgl_dibuat,
        gambar: item.gambar,
        judul: item.judul,
        isi: item.isi,
        jumlah_pembaca: item.jumlah_pembaca,
        kategori: {
          id_kategori: item.id_kategori,
          nama: item.nama_kategori,
          gambar: item.gambar,
        },
      }));

      const promises = formattedResult.map((item) => {
        return new Promise((resolve, reject) => {
          ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
            if (err) return reject(err);

            let replyCount = mainReplies.length;

            const mainReplyPromises = mainReplies.map((reply) => {
              return new Promise((resolveSub, rejectSub) => {
                ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                  if (err) return rejectSub(err);

                  replyCount += subReplies.length;
                  const formattedReply = {
                    id_interact: reply.id_interact,
                    user: {
                      username: reply.username
                    },
                    tanggal: reply.tanggal,
                    isi: reply.isi,
                  };

                  const formattedSubReplies = subReplies.map((subReply) => ({
                    id_reply: subReply.id_reply,
                    user: {
                      username: subReply.username
                    },
                    tanggal: subReply.tanggal,
                    isi: subReply.isi,
                  }));

                  formattedReply.sub_replies = formattedSubReplies;

                  resolveSub(formattedReply);
                });
              });
            });

            Promise.all(mainReplyPromises)
              .then((completedMainReplies) => {
                item.main_replies = completedMainReplies;
                item.jumlah_replies = replyCount;
                resolve(item);
              })
              .catch(reject);
          });
        });
      });

      Promise.all(promises)
        .then((finalResult) => res.json(finalResult))
        .catch((err) => res.status(500).send(err));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getForumTerbaru = async (req, res) => {
    try {
        const sql =
            "SELECT * FROM forum_diskusi JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori ORDER BY tgl_dibuat DESC";
        const mainReply =
            "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ?";
        const subReply =
            "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ?";

        db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);

            const formattedResult = result.map((item) => ({
            id_diskusi: item.id_diskusi,
            username: item.username,
            tgl_dibuat: item.tgl_dibuat,
            gambar: item.gambar,
            judul: item.judul,
            isi: item.isi,
            jumlah_pembaca: item.jumlah_pembaca,
            kategori: {
                id_kategori: item.id_kategori,
                nama: item.nama_kategori,
                gambar: item.gambar,
            },
            }));

            const promises = formattedResult.map((item) => {
            return new Promise((resolve, reject) => {
                db.query(mainReply, [item.id_diskusi], (err, main_replies) => {
                if (err) return reject(err);

                let replyCount = main_replies.length;

                const mainReplyPromises = main_replies.map((reply) => {
                    return new Promise((resolveSub, rejectSub) => {
                    db.query(subReply, [reply.id_interact], (err, sub_replies) => {
                        if (err) return rejectSub(err);

                        replyCount += sub_replies.length;
                        const formattedReply = {
                        id_interact: reply.id_interact,
                        username: reply.username,
                        tanggal: reply.tanggal,
                        isi: reply.isi,
                        };

                        const formattedSubReplies = sub_replies.map((subReply) => ({
                        id_reply: subReply.id_reply,
                        username: subReply.username,
                        tanggal: subReply.tanggal,
                        isi: subReply.isi,
                        }));

                        formattedReply.sub_replies = formattedSubReplies;

                        resolveSub(formattedReply);
                    });
                    });
                });

                Promise.all(mainReplyPromises)
                    .then((completemain_replies) => {
                    item.main_replies = completemain_replies;
                    item.jumlah_replies = replyCount;
                    resolve(item);
                    })
                    .catch(reject);
                });
            });
            });

            Promise.all(promises)
            .then((finalResult) => res.json(finalResult))
            .catch((err) => res.status(500).send(err));
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getForumTopDiskusi = async (req, res) => {
  try {
    ForumModel.getForumTopDiskusi((err, result) => {
      if (err) return res.status(500).send(err);

      const formattedResult = result.map((item) => ({
        id_diskusi: item.id_diskusi,
        username: item.username,
        tgl_dibuat: item.tgl_dibuat,
        gambar: item.gambar,
        judul: item.judul,
        isi: item.isi,
        jumlah_pembaca: item.jumlah_pembaca,
        kategori: {
          id_kategori: item.id_kategori,
          nama: item.nama_kategori,
          gambar: item.gambar,
        },
      }));

      // Handling replies asynchronously
      const promises = formattedResult.map((item) => {
        return new Promise((resolve, reject) => {
          ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
            if (err) return reject(err);

            let replyCount = mainReplies.length;

            const mainReplyPromises = mainReplies.map((reply) => {
              return new Promise((resolveSub, rejectSub) => {
                ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                  if (err) return rejectSub(err);

                  replyCount += subReplies.length;
                  const formattedReply = {
                    id_interact: reply.id_interact,
                    username: reply.username,
                    tanggal: reply.tanggal,
                    isi: reply.isi,
                  };

                  const formattedSubReplies = subReplies.map((subReply) => ({
                    id_reply: subReply.id_reply,
                    username: subReply.username,
                    tanggal: subReply.tanggal,
                    isi: subReply.isi,
                  }));

                  formattedReply.sub_replies = formattedSubReplies;

                  resolveSub(formattedReply);
                });
              });
            });

            Promise.all(mainReplyPromises)
              .then((completedMainReplies) => {
                item.main_replies = completedMainReplies;
                item.jumlah_replies = replyCount;
                resolve(item);
              })
              .catch(reject);
          });
        });
      });

      Promise.all(promises)
        .then((finalResult) => {
          return finalResult.sort((a, b) => {
            const aScore = a.jumlah_pembaca + a.jumlah_replies;
            const bScore = b.jumlah_pembaca + b.jumlah_replies;
            return bScore - aScore;
          });
        })
        .then((sortedResult) => {
          res.status(200).send(sortedResult);
        })
        .catch((err) => res.status(500).send(err));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getForumByKategori = async (req, res) => {
  try {
    ForumModel.getForumByKategori(req.params.id, (err, result) => {
      if (err) return res.status(500).send(err);

      const formattedResult = result.map((item) => ({
        id_diskusi: item.id_diskusi,
        user: {
          username: item.username,
        },
        tgl_dibuat: item.tgl_dibuat,
        gambar: item.gambar,
        judul: item.judul,
        isi: item.isi,
        jumlah_pembaca: item.jumlah_pembaca,
        kategori: {
          id_kategori: item.id_kategori,
          nama: item.nama_kategori,
          gambar: item.gambar,
        },
      }));

      const promises = formattedResult.map((item) => {
        return new Promise((resolve, reject) => {
          ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
            if (err) return reject(err);

            let replyCount = mainReplies.length;

            const mainReplyPromises = mainReplies.map((reply) => {
              return new Promise((resolveSub, rejectSub) => {
                ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                  if (err) return rejectSub(err);

                  replyCount += subReplies.length;
                  const formattedReply = {
                    id_interact: reply.id_interact,
                    user: {
                      username: reply.username,
                    },
                    tanggal: reply.tanggal,
                    isi: reply.isi,
                  };

                  const formattedSubReplies = subReplies.map((subReply) => ({
                    id_reply: subReply.id_reply,
                    user: {
                      username: subReply.username,
                    },
                    tanggal: subReply.tanggal,
                    isi: subReply.isi,
                  }));

                  formattedReply.sub_replies = formattedSubReplies;

                  resolveSub(formattedReply);
                });
              });
            });

            Promise.all(mainReplyPromises)
              .then((completedMainReplies) => {
                item.main_replies = completedMainReplies;
                item.jumlah_replies = replyCount;
                resolve(item);
              })
              .catch(reject);
          });
        });
      });

      Promise.all(promises)
        .then((finalResult) => res.json(finalResult))
        .catch((err) => res.status(500).send(err));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getForumByKeyword = async (req, res) => {
  try {
    const searchQuery = `%${req.params.search}%`;

    ForumModel.searchForumByKeyword(searchQuery, (err, result) => {
      if (err) return res.status(500).send(err);

      const formattedResult = result.map((item) => ({
        id_diskusi: item.id_diskusi,
        user: {
          username: item.username,
        },
        tgl_dibuat: item.tgl_dibuat,
        gambar: item.gambar,
        judul: item.judul,
        isi: item.isi,
        jumlah_pembaca: item.jumlah_pembaca,
        kategori: {
          id_kategori: item.id_kategori,
          nama: item.nama_kategori,
          gambar: item.gambar,
        },
      }));

      const promises = formattedResult.map((item) => {
        return new Promise((resolve, reject) => {
          ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
            if (err) return reject(err);

            let replyCount = mainReplies.length;

            const mainReplyPromises = mainReplies.map((reply) => {
              return new Promise((resolveSub, rejectSub) => {
                ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                  if (err) return rejectSub(err);

                  replyCount += subReplies.length;
                  const formattedReply = {
                    id_interact: reply.id_interact,
                    user: {
                      username: reply.username,
                    },
                    tanggal: reply.tanggal,
                    isi: reply.isi,
                  };

                  const formattedSubReplies = subReplies.map((subReply) => ({
                    id_reply: subReply.id_reply,
                    user: {
                      username: subReply.username,
                    },
                    tanggal: subReply.tanggal,
                    isi: subReply.isi,
                  }));

                  formattedReply.sub_replies = formattedSubReplies;

                  resolveSub(formattedReply);
                });
              });
            });

            Promise.all(mainReplyPromises)
              .then((completedMainReplies) => {
                item.main_replies = completedMainReplies;
                item.jumlah_replies = replyCount;
                resolve(item);
              })
              .catch(reject);
          });
        });
      });

      Promise.all(promises)
        .then((finalResult) => res.json(finalResult))
        .catch((err) => res.status(500).send(err));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getForumById = async (req, res) => {
  try {
    const idDiskusi = req.params.id;

    ForumModel.getForumById(idDiskusi, (err, result) => {
      if (err) return res.status(500).send(err);

      const formattedResult = result.map((item) => ({
        id_diskusi: item.id_diskusi,
        user: {
          username: item.username
        },
        tgl_dibuat: item.tgl_dibuat,
        gambar: item.gambar,
        judul: item.judul,
        isi: item.isi,
        jumlah_pembaca: item.jumlah_pembaca,
        kategori: {
          id_kategori: item.id_kategori,
          nama: item.nama_kategori,
          gambar: item.gambar,
        },
      }));

      ForumModel.updateViewCount(idDiskusi, (err) => {
        if (err) return res.status(500).send(err);
      });

      const promises = formattedResult.map((item) => {
        return new Promise((resolve, reject) => {
          ForumModel.getMainReplies(item.id_diskusi, (err, mainReplies) => {
            if (err) return reject(err);

            let replyCount = mainReplies.length;

            const mainReplyPromises = mainReplies.map((reply) => {
              return new Promise((resolveSub, rejectSub) => {
                ForumModel.getSubReplies(reply.id_interact, (err, subReplies) => {
                  if (err) return rejectSub(err);

                  replyCount += subReplies.length;
                  const formattedReply = {
                    id_interact: reply.id_interact,
                    user: {
                      username: reply.username,
                      ip: reply.ip,
                    },
                    tanggal: reply.tanggal,
                    isi: reply.isi,
                  };

                  const formattedSubReplies = subReplies.map((subReply) => ({
                    id_reply: subReply.id_reply,
                    user: {
                      username: subReply.username,
                      ip: subReply.ip,
                    },
                    tanggal: subReply.tanggal,
                    isi: subReply.isi,
                  }));

                  formattedReply.sub_replies = formattedSubReplies;

                  resolveSub(formattedReply);
                });
              });
            });

            Promise.all(mainReplyPromises)
              .then((completedMainReplies) => {
                item.main_replies = completedMainReplies;
                item.jumlah_replies = replyCount;
                resolve(item);
              })
              .catch(reject);
          });
        });
      });

      Promise.all(promises)
        .then((finalResult) => res.json(finalResult))
        .catch((err) => res.status(500).send(err));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createForum = async (req, res) => {
  try {
    const { username, judul, isi, id_kategori } = req.body;
    const gambar = req.file ? req.file.path : null;
    const token = req.headers.authorization?.split(" ")[1];

    ForumModel.checkUser(username, token, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      ForumModel.createForum(username, gambar, judul, isi, id_kategori, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }

        res.json({
          message: "Diskusi added successfully",
          id_diskusi: result.insertId,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteForum = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];

    ForumModel.checkUser(id, token, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      ForumModel.deleteForum(id, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }

        res.json({ message: "Diskusi deleted successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createReply = async (req, res) => {
  try {
    const { id_diskusi, id_interact, username, isi } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    ForumModel.checkUser(username, token, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      if (id_interact === null) {
        ForumModel.createReply(id_diskusi, username, isi, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Database error", error: err });
          }

          res.json({ message: "Reply added successfully" });
        });
      } else {
        ForumModel.createSubReply(id_interact, username, isi, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Database error", error: err });
          }

          res.json({ message: "Reply added successfully" });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteFirstReply = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];

    ForumModel.checkChildReplies(id, (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (result.length > 0) {
        ForumModel.updateFirstReplyToDeleted(id, (err, result) => {
          if (err) return res.status(500).json({ message: "Database error", error: err });

          res.json({ message: "Reply deleted successfully (first reply updated)" });
        });
      } else {
        ForumModel.checkUser(id, token, (err, result) => {
          if (err) return res.status(500).json({ message: "Database error", error: err });

          if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
          }

          ForumModel.deleteFirstReply(id, (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            res.json({ message: "Reply deleted successfully (first reply removed)" });
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteSecondReply = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];

    ForumModel.checkUserForSecondReply(id, token, (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (result.length === 0) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      ForumModel.deleteSecondReply(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        res.json({ message: "Reply deleted successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
    getForumTerakhir,
    getAllForum,
    getForumTerbaru,
    getForumTopDiskusi,
    getForumByKategori,
    getForumByKeyword,
    getForumById,
    createForum,
    deleteForum,
    createReply,
    deleteFirstReply,
    deleteSecondReply,
};