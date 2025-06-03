const FieldModel = require("../models/fieldModel");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;
const axios = require("axios");

dotenv.config();

// Get field by user ID
const getFieldByUserID = (req, res) => {
  const user_id = req.user.user_id;

  FieldModel.getFieldByUserID(user_id, (err, data) => {
    if (err) {
      console.error("Error fetching field data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};

// Create new field
const createField = (req, res) => {
  const {
    nama_lahan,
    jenis_tanah,
    id_tanaman,
    coords,
    luas_lahan,
    tanggal_tanam,
    estimasi_panen,
  } = req.body;

  const user_id = req.user.user_id;

  FieldModel.createField(
    {
      user_id,
      nama_lahan,
      jenis_tanah,
      id_tanaman,
      coords,
      luas_lahan,
      tanggal_tanam,
      estimasi_panen,
    },
    (err) => {
      if (err) {
        console.error("Error creating field:", err);
        return res.status(500).json({ message: "Error: Creating field error" });
      }
      res.json({ message: "Field created successfully" });
    }
  );
};

// Update field by id and token's username
const updateField = (req, res) => {
  const {
    id_field,
    nama_lahan,
    jenis_tanah,
    id_tanaman,
    coords,
    luas_lahan,
    tanggal_tanam,
    estimasi_panen,
  } = req.body;
  const user_id = req.user.user_id;

  FieldModel.updateField(
    id_field,
    {
      user_id,
      nama_lahan,
      jenis_tanah,
      id_tanaman,
      coords,
      luas_lahan,
      tanggal_tanam,
      estimasi_panen,
    },
    (err) => {
      if (err) {
        console.error("Error updating field:", err);
        return res.status(500).json({ message: "Error: Updating field error" });
      }
      res.json({ message: "Field updated successfully" });
    }
  );
};

// Delete a field by id and token's username
const deleteField = (req, res) => {
  const { id } = req.body;
  const user_id = req.user.user_id;

  FieldModel.deleteField(id, user_id, (err) => {
    if (err) {
      console.error("Error deleting field:", err);
      return res.status(500).json({ message: "Error: Deleting field error" });
    }
    res.json({ message: "Field deleted successfully" });
  });
};

// Get field by ID (no auth required for this example)
const getFieldById = (req, res) => {
  const { id_field } = req.params;

  FieldModel.getFieldById(id_field, (err, data) => {
    if (err) {
      console.error("Error fetching field by ID:", err);
      return res
        .status(500)
        .json({ message: "Error: Fetching field by ID error" });
    }
    res.json(data);
  });
};

// Get all crop data
const getCropData = (req, res) => {
  FieldModel.getCropData((err, data) => {
    if (err) {
      console.error("Error fetching crop data:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};

// Get crop by ID
const getCropById = (req, res) => {
  const { id_tanaman } = req.params;
  FieldModel.getCropById(id_tanaman, (err, data) => {
    if (err) {
      console.error("Error fetching crop by ID:", err);
      return res.status(500).json({ message: "Error: Fetching data error" });
    }
    res.json(data);
  });
};

const reverseGeocode = async (req, res) => {
  const { lat, lon } = req.query;

  const CACHE_DIR = path.resolve(__dirname, "../cache");
  const CACHE_TTL = 5 * 60 * 1000;

  const getCacheFileName = (lat, lon) => {
    const safeLat = lat.replace(/\./g, "_");
    const safeLon = lon.replace(/\./g, "_");
    return path.join(CACHE_DIR, `${safeLat}_${safeLon}.json`);
  };

  if (!lat || !lon) {
    return res.status(400).json({ message: "Missing lat or lon parameter" });
  }

  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const cacheFile = getCacheFileName(lat, lon);

    try {
      const stats = await fs.stat(cacheFile);
      const now = Date.now();
      const mtime = new Date(stats.mtime).getTime();

      if (now - mtime < CACHE_TTL) {
        const cachedData = await fs.readFile(cacheFile, "utf-8");
        const data = JSON.parse(cachedData);
        return res.json(data);
      }
    } catch {
      console.log("Cache tidak ditemukan atau expired, fetch baru.");
    }

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`, 
      {
        params: {
          lat,
          lon,
          format: "json",
          "accept-language": "id"
        },
        headers: {
          "User-Agent": "Mahitala",
          "Content-Type": "application/json"
        }
      }
    );

    const data = response.data;

    await fs.writeFile(cacheFile, JSON.stringify(data));
    console.log("Data baru disimpan ke cache:", cacheFile);
    console.log("Data baru:", data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error: " + error });
  }
};

module.exports = {
  getFieldByUserID,
  createField,
  updateField,
  deleteField,
  getFieldById,
  getCropData,
  getCropById,
  reverseGeocode,
};
