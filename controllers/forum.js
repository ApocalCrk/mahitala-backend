const db = require("../db/setup");

const getForumTerakhir = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkUser = "SELECT * FROM forum_akses WHERE token = ?";
        db.query(checkUser, [token], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const sql =
            "SELECT * FROM forum_diskusi JOIN forum_akses ON forum_diskusi.username = forum_akses.username JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori WHERE forum_akses.token = ? ORDER BY tgl_dibuat DESC";
        const mainReply =
            "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ? ORDER BY tanggal ASC";
        const subReply =
            "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ? ORDER BY tanggal ASC";

        db.query(sql, [token], (err, result) => {
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
                    db.query(
                        subReply,
                        [reply.id_interact],
                        (err, sub_replies) => {
                        if (err) return rejectSub(err);

                        replyCount += sub_replies.length;
                        const formattedReply = {
                            id_interact: reply.id_interact,
                            username: reply.username,
                            tanggal: reply.tanggal,
                            isi: reply.isi,
                        };

                        const formattedSubReplies = sub_replies.map(
                            (subReply) => ({
                            id_reply: subReply.id_reply,
                            username: subReply.username,
                            tanggal: subReply.tanggal,
                            isi: subReply.isi,
                            })
                        );

                        formattedReply.sub_replies = formattedSubReplies;

                        resolveSub(formattedReply);
                        }
                    );
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
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllForum = async (req, res) => {
    try {
        const sql =
          "SELECT * FROM forum_diskusi JOIN forum_akses ON forum_diskusi.username = forum_akses.username JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori";
        const mainReply =
          "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ?";
        const subReply =
          "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ?";
    
        db.query(sql, (err, result) => {
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
                        user: {
                          username: reply.username
                        },
                        tanggal: reply.tanggal,
                        isi: reply.isi,
                      };
    
                      const formattedSubReplies = sub_replies.map((subReply) => ({
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

const getForumTopDiscussion = async (req, res) => {
    try {
        const sql =
          "SELECT * FROM forum_diskusi JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori";
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
        const sql =
          "SELECT * FROM forum_diskusi JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori WHERE forum_diskusi.id_kategori = ?";
        const mainReply =
          "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ?";
        const subReply =
          "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ?";
    
        db.query(sql, [req.params.id], (err, result) => {
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
                        user: {
                          username: reply.username
                        },
                        tanggal: reply.tanggal,
                        isi: reply.isi,
                      };
    
                      const formattedSubReplies = sub_replies.map((subReply) => ({
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

const getForumByKeyword = async (req, res) => {
    try {
        const sql = "SELECT * FROM forum_diskusi WHERE judul LIKE ?";
        const mainReply =
          "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ?";
        const subReply =
          "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ?";
        const searchQuery = `%${req.params.search}%`;
        db.query(sql, [searchQuery], (err, result) => {
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
                        user: {
                          username: reply.username
                        },
                        tanggal: reply.tanggal,
                        isi: reply.isi,
                      };
    
                      const formattedSubReplies = sub_replies.map((subReply) => ({
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

const getForumById = async (req, res) => {
    try {
        const sql =
          "SELECT * FROM forum_diskusi JOIN forum_akses ON forum_diskusi.username = forum_akses.username JOIN kategori ON forum_diskusi.id_kategori = kategori.id_kategori WHERE id_diskusi = ?";
        const mainReply =
          "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_diskusi = ? ORDER BY tanggal ASC";
        const subReply =
          "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_interact = ? ORDER BY tanggal ASC";
    
        const updateJumlahPembaca =
          "UPDATE forum_diskusi SET jumlah_pembaca = jumlah_pembaca + 1 WHERE id_diskusi = ?";
    
        db.query(sql, [req.params.id], (err, result) => {
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
    
          db.query(updateJumlahPembaca, [req.params.id], (err, result) => {
            if (err) {
              return;
            }
          });
    
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
                        user: {
                          username: reply.username,
                          ip: reply.ip,
                        },
                        tanggal: reply.tanggal,
                        isi: reply.isi,
                      };
    
                      const formattedSubReplies = sub_replies.map((subReply) => ({
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

const createForum = async (req, res) => {
    try {
        const { username, judul, isi, id_kategori } = req.body;
        const gambar = req.file ? req.file.path : null;
    
        const token = req.headers.authorization?.split(" ")[1];
        const checkUser =
          "SELECT * FROM forum_akses WHERE username = ? AND token = ?";
        db.query(checkUser, [username, token], (err, result) => {
          if (err)
            return res.status(500).json({ message: "Database error", error: err });
    
          if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
          }
    
          const sql =
            "INSERT INTO forum_diskusi (username, gambar, judul, isi, id_kategori) VALUES (?, ?, ?, ?, ?)";
          db.query(
            sql,
            [username, gambar, judul, isi, id_kategori],
            (err, result) => {
              if (err)
                return res
                  .status(500)
                  .json({ message: "Database error", error: err });
    
              res.json({
                message: "Diskusi added successfully",
                id_diskusi: result.insertId,
              });
            }
          );
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteForum = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const checkUser =
          "SELECT * FROM forum_diskusi JOIN forum_akses ON forum_diskusi.username = forum_akses.username WHERE id_diskusi = ? AND token = ?";
        db.query(checkUser, [id, token], (err, result) => {
          if (err) return res.status(500).send(err);
    
          if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
          }
    
          const sql = "DELETE FROM forum_diskusi WHERE id_diskusi = ?";
          db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).send(err);
    
            res.json({ message: "Diskusi deleted successfully" });
          });
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const createReply = async (req, res) => {
    try {
        const { id_diskusi, id_interact, username, isi } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const checkUser =
          "SELECT * FROM forum_akses WHERE username = ? AND token = ?";
        db.query(checkUser, [username, token], (err, result) => {
          if (err) return res.status;
    
          if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
          }
    
          const sql =
            "INSERT INTO user_in_diskusi (id_diskusi, username, isi) VALUES (?, ?, ?)";
          const sql2 =
            "INSERT INTO user_reply_diskusi (id_interact, username, isi) VALUES (?, ?, ?)";
          if (id_interact === null) {
            db.query(sql, [id_diskusi, username, isi], (err, result) => {
              if (err) return res;
    
              res.json({ message: "Reply added successfully" });
            });
          } else {
            db.query(sql2, [id_interact, username, isi], (err, result) => {
              if (err) return res;
    
              res.json({ message: "Reply added successfully" });
            });
          }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteFirstReply = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const checkUser =
          "SELECT * FROM user_in_diskusi JOIN forum_akses ON user_in_diskusi.username = forum_akses.username WHERE id_interact = ? AND token = ?";
    
        const checkChild = "SELECT * FROM user_reply_diskusi WHERE id_interact = ?";
        db.query(checkChild, [id], (err, result) => {
          if (err) return res.status(500).send(err);
    
          if (result.length > 0) {
            const sql =
              "UPDATE user_in_diskusi SET isi = '[deleted]' WHERE id_interact = ?";
            db.query(sql, [id], (err, result) => {
              if (err) return res.status(500).send(err);
    
              res.json({ message: "Reply deleted successfully" });
            });
          } else {
            db.query(checkUser, [id, token], (err, result) => {
              if (err) return res.status(500).send(err);
    
              if (result.length === 0) {
                return res.status(401).json({ message: "Unauthorized access" });
              }
    
              const sql = "DELETE FROM user_in_diskusi WHERE id_interact = ?";
              db.query(sql, [id], (err, result) => {
                if (err) return res.status(500).send(err);
    
                res.json({ message: "Reply deleted successfully" });
              });
            });
          }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteSecondReply = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const checkUser =
          "SELECT * FROM user_reply_diskusi JOIN forum_akses ON user_reply_diskusi.username = forum_akses.username WHERE id_reply = ? AND token = ?";
        db.query(checkUser, [id, token], (err, result) => {
          if (err) return res.status(500).send(err);
    
          if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized access" });
          }
    
          const sql = "DELETE FROM user_reply_diskusi WHERE id_reply = ?";
          db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).send(err);
    
            res.json({ message: "Reply deleted successfully" });
          });
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getForumTerakhir,
    getAllForum,
    getForumTerbaru,
    getForumTopDiscussion,
    getForumByKategori,
    getForumByKeyword,
    getForumById,
    createForum,
    deleteForum,
    createReply,
    deleteFirstReply,
    deleteSecondReply,
};