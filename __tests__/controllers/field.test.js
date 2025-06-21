const {
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
} = require("../../src/controllers/field");
const FieldModel = require("../../src/models/fieldModel");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const { PassThrough } = require("stream");

jest.mock("../../src/models/fieldModel");
jest.mock("axios");
jest.mock("fs", () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

describe("Field Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      user: { user_id: 1 },
      params: {},
      query: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      setHeader: jest.fn(),
    };
  });

  describe("getFieldByUserID", () => {
    it("should fetch fields for the logged-in user", async () => {
      const mockFields = [{ id: 1, name: "My Field" }];
      FieldModel.getFieldByUserID.mockResolvedValue(mockFields);

      await getFieldByUserID(req, res);

      expect(FieldModel.getFieldByUserID).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockFields);
    });

    it("should return 500 on error", async () => {
      FieldModel.getFieldByUserID.mockRejectedValue(new Error("DB Error"));
      await getFieldByUserID(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("createField", () => {
    it("should create a new field successfully", async () => {
      req.body = { name: "New Field", area: 10 };
      const newFieldId = 5;
      FieldModel.createField.mockResolvedValue(newFieldId);

      await createField(req, res);

      const expectedData = { name: "New Field", area: 10, user_id: 1 };
      expect(FieldModel.createField).toHaveBeenCalledWith(expectedData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Field created successfully",
        c_id: newFieldId,
      });
    });

    it("should return 500 on error", async () => {
      req.body = { name: "New Field" };
      FieldModel.createField.mockRejectedValue(new Error("DB Error"));
      await createField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Creating field error",
      });
    });
  });

  describe("updateField", () => {
    it("should update a field successfully", async () => {
      req.body = { id_field: 1, name: "Updated Field Name" };
      FieldModel.updateField.mockResolvedValue();

      await updateField(req, res);

      expect(FieldModel.updateField).toHaveBeenCalledWith(1, {
        name: "Updated Field Name",
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "Field updated successfully",
      });
    });

    it("should return 500 on error", async () => {
      req.body = { id_field: 1, name: "Updated Name" };
      FieldModel.updateField.mockRejectedValue(new Error("DB Error"));
      await updateField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Updating field error",
      });
    });
  });

  describe("deleteField", () => {
    it("should delete a field successfully", async () => {
      req.body = { id: 15 };
      FieldModel.deleteField.mockResolvedValue();

      await deleteField(req, res);

      expect(FieldModel.deleteField).toHaveBeenCalledWith(15, 1);
      expect(res.json).toHaveBeenCalledWith({
        message: "Field deleted successfully",
      });
    });

    it("should return 500 on error", async () => {
      req.body = { id: 15 };
      FieldModel.deleteField.mockRejectedValue(new Error("DB Error"));
      await deleteField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Deleting field error",
      });
    });
  });

  describe("getFieldById", () => {
    it("should fetch a single field by its ID", async () => {
      req.params.id_field = 3;
      const mockField = { id_field: 3, name: "A Specific Field" };
      FieldModel.getFieldById.mockResolvedValue(mockField);

      await getFieldById(req, res);

      expect(FieldModel.getFieldById).toHaveBeenCalledWith(3);
      expect(res.json).toHaveBeenCalledWith(mockField);
    });

    it("should return 404 if field is not found", async () => {
      req.params.id_field = 99;
      FieldModel.getFieldById.mockResolvedValue(null);

      await getFieldById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Field not found" });
    });

    it("should return 500 on error", async () => {
      req.params.id_field = 3;
      FieldModel.getFieldById.mockRejectedValue(new Error("DB Error"));
      await getFieldById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching field by ID error",
      });
    });
  });

  describe("getCropData", () => {
    it("should fetch all crop data", async () => {
      const mockCrops = [{ id_tanaman: 1, nama_tanaman: "Padi" }];
      FieldModel.getCropData.mockResolvedValue(mockCrops);

      await getCropData(req, res);

      expect(FieldModel.getCropData).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockCrops);
    });

    it("should return 500 on fetch error", async () => {
      FieldModel.getCropData.mockRejectedValue(new Error("DB error"));
      await getCropData(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getCropById", () => {
    it("should fetch a single crop by its ID", async () => {
      req.params.id_tanaman = 2;
      const mockCrop = { id_tanaman: 2, nama_tanaman: "Jagung" };
      FieldModel.getCropById.mockResolvedValue(mockCrop);

      await getCropById(req, res);

      expect(FieldModel.getCropById).toHaveBeenCalledWith(2);
      expect(res.json).toHaveBeenCalledWith(mockCrop);
    });

    it("should return 404 if crop is not found", async () => {
      req.params.id_tanaman = 100;
      FieldModel.getCropById.mockResolvedValue(null);

      await getCropById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Crop not found" });
    });
  });

  describe("reverseGeocode", () => {
    it("should return geocode data from API and cache it", async () => {
      req.query = { lat: "1.23", lon: "4.56" };
      const mockApiData = { display_name: "Test Location" };
      axios.get.mockResolvedValue({ data: mockApiData });

      await reverseGeocode(req, res);

      expect(axios.get).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockApiData);
    });

    it("should return data from cache if API fails", async () => {
      req.query = { lat: "1.23", lon: "4.56" };
      axios.get.mockRejectedValue(new Error("API Error"));
      const mockCacheData = { display_name: "Cached Location" };
      fs.readFile.mockResolvedValue(JSON.stringify(mockCacheData));

      await reverseGeocode(req, res);

      expect(axios.get).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ from_cache: true })
      );
    });
  });

  describe("radarInfo", () => {
    it("should fetch radar info from BMKG API", async () => {
      process.env.API_RADAR = "http://test-radar-api.com";
      const mockRadarData = { data: "radar data" };
      axios.get.mockResolvedValue({ data: mockRadarData });

      await radarInfo(req, res);

      expect(axios.get).toHaveBeenCalledWith(
        "http://test-radar-api.com",
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockRadarData);
    });

    it("should handle BMKG API error response", async () => {
      process.env.API_RADAR = "http://test-radar-api.com";
      axios.get.mockRejectedValue({
        response: { status: 404, data: "Not Found" },
      });

      await radarInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Server BMKG memberikan respons error",
        })
      );
    });
  });

  describe("proxyWeatherTile", () => {
    it("should proxy a weather tile successfully", async () => {
      req.params = { layer: "clouds_new", z: 1, x: 2, y: 3 };
      process.env.OWM_API_KEY = "test_key";

      const mockStream = new PassThrough();
      axios.get.mockResolvedValue({ data: mockStream });

      const pipe = jest.fn();
      res.pipe = pipe;
      mockStream.pipe = pipe;

      await proxyWeatherTile(req, res);
      mockStream.emit("end");

      expect(axios.get).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/png");
      expect(pipe).toHaveBeenCalledWith(res);
    });
  });

  describe("proxySentinelWMS", () => {
    it("should proxy a Sentinel WMS tile successfully", async () => {
      req.query = { BBOX: "1,2,3,4" };
      process.env.SENTINEL_HUB_INSTANCE = "test_instance";
      const mockStream = new PassThrough();
      axios.get.mockResolvedValue({ data: mockStream });

      const pipe = jest.fn();
      res.pipe = pipe;
      mockStream.pipe = pipe;

      await proxySentinelWMS(req, res);
      mockStream.emit("end");

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("sentinel-hub.com"),
        expect.any(Object)
      );
      expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/png");
      expect(pipe).toHaveBeenCalledWith(res);
    });
  });
});
