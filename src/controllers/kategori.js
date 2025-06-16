const KategoriModel = require('../models/kategoriModel');

const getAllKategori = async (req, res) => {
  try {
    const result = await KategoriModel.getAllKategori();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBestKategori = async (req, res) => {
  try {
    const result = await KategoriModel.getBestKategori();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getKategoriById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await KategoriModel.getKategoriById(id);
    res.status(200).json(result);
  } catch (err) {
    // Menangkap error "Kategori tidak ditemukan" dari model
    if (err.message === "Kategori tidak ditemukan") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllKategori,
  getBestKategori,
  getKategoriById,
};