const FieldModel = require("../models/fieldModel");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;
const axios = require("axios");
const https = require("https");

dotenv.config();

const agent = new https.Agent({ family: 4 });

// Get field by user ID
const getFieldByUserID = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const data = await FieldModel.getFieldByUserID(user_id);
    res.json(data);
  } catch (error) {
    console.error("Error fetching field data:", error);
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

// Create new field
const createField = async (req, res) => {
  try {
    const data = { ...req.body, user_id: req.user.user_id };
    const id_field = await FieldModel.createField(data);
    res.status(201).json({
      message: "Field created successfully",
      c_id: id_field,
    });
  } catch (error) {
    console.error("Error creating field:", error);
    res.status(500).json({ message: "Error: Creating field error" });
  }
};

// Update field
const updateField = async (req, res) => {
  try {
    const { id_field, ...dataToUpdate } = req.body;
    await FieldModel.updateField(id_field, dataToUpdate);
    res.json({ message: "Field updated successfully" });
  } catch (error) {
    console.error("Error updating field:", error);
    res.status(500).json({ message: "Error: Updating field error" });
  }
};

// Delete a field
const deleteField = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user.user_id;
    await FieldModel.deleteField(id, user_id);
    res.json({ message: "Field deleted successfully" });
  } catch (error) {
    console.error("Error deleting field:", error);
    res.status(500).json({ message: "Error: Deleting field error" });
  }
};

// Get field by ID
const getFieldById = async (req, res) => {
  try {
    const { id_field } = req.params;
    const data = await FieldModel.getFieldById(id_field);
    if (!data) {
      return res.status(404).json({ message: "Field not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching field by ID:", error);
    res.status(500).json({ message: "Error: Fetching field by ID error" });
  }
};

// Get all crop data
const getCropData = async (req, res) => {
  try {
    const data = await FieldModel.getCropData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching crop data:", error);
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

// Get crop by ID
const getCropById = async (req, res) => {
  try {
    const { id_tanaman } = req.params;
    const data = await FieldModel.getCropById(id_tanaman);
    if (!data) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching crop by ID:", error);
    res.status(500).json({ message: "Error: Fetching data error" });
  }
};

// --- Fungsi yang sudah async tidak perlu diubah ---

const reverseGeocode = async (req, res) => {
  const { lat, lon } = req.query;

  const CACHE_DIR = path.resolve(__dirname, "../cache");
  const getCacheFileName = (lat, lon) => {
    const safeLat = lat.replace(/\./g, "_");
    const safeLon = lon.replace(/\./g, "_");
    return path.join(CACHE_DIR, `${safeLat}_${safeLon}.json`);
  };

  if (!lat || !lon) {
    return res.status(400).json({ message: "Missing lat or lon parameter" });
  }

  await fs.mkdir(CACHE_DIR, { recursive: true });
  const cacheFile = getCacheFileName(lat, lon);

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        httpsAgent: agent,
        params: { lat, lon, format: "json", "accept-language": "id" },
        headers: {
          "User-Agent": "Mahitala",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    await fs.writeFile(cacheFile, JSON.stringify(data), "utf-8");
    return res.json(data);
  } catch (error) {
    console.error("Gagal mengambil dari API, mencoba membaca dari cache...");
    try {
      const cachedData = await fs.readFile(cacheFile, "utf-8");
      const data = JSON.parse(cachedData);
      return res.json({
        ...data,
        from_cache: true,
        warning: "Data diambil dari cache karena API gagal.",
      });
    } catch (cacheError) {
      console.error("Gagal membaca cache juga:", cacheError);
      return res.status(500).json({
        message: "Gagal mengambil data dari API dan cache.",
        error: error.message,
      });
    }
  }
};

const radarInfo = async (req, res) => {
  const bmkgApiUrl = process.env.API_RADAR;
  if (!bmkgApiUrl) {
    return res
      .status(500)
      .json({ message: "URL API BMKG tidak terkonfigurasi di .env" });
  }
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Referer: "https://signature.bmkg.go.id/",
  };
  try {
    const response = await axios.get(bmkgApiUrl, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error saat mengambil data radar dari BMKG:", error.message);
    if (error.response) {
      res.status(error.response.status).json({
        message: "Server BMKG memberikan respons error",
        bmkg_status: error.response.status,
        bmkg_data: error.response.data,
      });
    } else if (error.request) {
      res
        .status(504)
        .json({
          message: "Tidak ada respons dari server BMKG (Gateway Timeout)",
        });
    } else {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan internal", error: error.message });
    }
  }
};

const proxyWeatherTile = async (req, res) => {
  const { layer, z, x, y } = req.params;
  const tileUrl = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${process.env.OWM_API_KEY}`;

  try {
    const response = await axios.get(tileUrl, { responseType: "stream" });
    res.setHeader("Content-Type", "image/png");
    response.data.pipe(res);
  } catch (error) {
    console.error("Gagal mengambil tile cuaca:", error.message);
    res.status(500).json({ message: "Gagal mengambil tile cuaca" });
  }
};

const proxySentinelWMS = async (req, res) => {
  const params = new URLSearchParams({
    ...req.query,
    REQUEST: "GetMap",
    SERVICE: "WMS",
    VERSION: "1.3.0",
    LAYERS: "VEGETATION_INDEX",
    FORMAT: "image/png",
    TRANSPARENT: "true",
  });

  const url = `https://services.sentinel-hub.com/ogc/wms/${process.env.SENTINEL_HUB_INSTANCE}?${params.toString()}`;

  try {
    const response = await axios.get(url, { responseType: "stream" });
    res.setHeader("Content-Type", "image/png");
    response.data.pipe(res);
  } catch (error) {
    console.error("Gagal mengambil tile Sentinel WMS:", error.message);
    res.status(500).json({ message: "Gagal mengambil tile Sentinel WMS" });
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
  radarInfo,
  proxyWeatherTile,
  proxySentinelWMS,
};