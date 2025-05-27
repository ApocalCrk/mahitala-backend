const KategoriModel = require('../models/kategoriModel');

const getAllKategori = async (req, res) => {
  try {
    KategoriModel.getAllKategori((err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getBestKategori = async (req, res) => {
  try {
    KategoriModel.getBestKategori((err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getKategoriById = async (req, res) => {
  try {
    const id = req.params.id;
    KategoriModel.getKategoriById(id, (err, result) => {
      if (err) {
        if (err.message) {
          return res.status(404).send({ message: err.message });
        }
        return res.status(500).send(err);
      }

      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllKategori,
  getBestKategori,
  getKategoriById,
};
