const FieldModel = require("../models/fieldModel");
const dotenv = require("dotenv");

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
  const { id_field, nama_lahan, jenis_tanah, id_tanaman, coords, luas_lahan, tanggal_tanam, estimasi_panen } = req.body;
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
}

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
      return res.status(500).json({ message: "Error: Fetching field by ID error" });
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

module.exports = {
  getFieldByUserID,
  createField,
  updateField,
  deleteField,
  getFieldById,
  getCropData,
  getCropById
};
