const fieldController = require('../../src/controllers/field');
const FieldModel = require('../../src/models/fieldModel');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

jest.mock('../../src/models/fieldModel', () => ({
  getFieldByUserID: jest.fn(),
  createField: jest.fn(),
  updateField: jest.fn(),
  deleteField: jest.fn(),
  getFieldById: jest.fn(),
  getCropData: jest.fn(),
  getCropById: jest.fn(),
}));

jest.mock('axios');
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));
jest.mock('path');
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

const mockRequest = (body = {}, params = {}, query = {}, user = {}) => ({
  body,
  params,
  query,
  user,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Field Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    path.resolve.mockReturnValue('/mock/path/to/cache');
    path.join.mockImplementation((...args) => args.join('/')); // Simulate path.join
  });

  describe('getFieldByUserID', () => {
    test('should return field data for a user successfully', async () => {
      const req = mockRequest({}, {}, {}, { user_id: 1 });
      const res = mockResponse();
      const mockData = [{ id_field: 1, nama_lahan: 'Sawah', user_id: 1 }];

      FieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(null, mockData);
      });

      await fieldController.getFieldByUserID(req, res);

      expect(FieldModel.getFieldByUserID).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching field data fails', async () => {
      const req = mockRequest({}, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(new Error('DB error'), null);
      });

      await fieldController.getFieldByUserID(req, res);

      expect(FieldModel.getFieldByUserID).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('createField', () => {
    const fieldData = {
      nama_lahan: 'Ladang Jagung',
      jenis_tanah: 'Gambut',
      id_tanaman: 2,
      coords: 'POLYGON((...))',
      luas_lahan: 1000,
      tanggal_tanam: '2023-01-01',
      estimasi_panen: '2023-05-01',
    };

    test('should create a new field successfully', async () => {
      const req = mockRequest(fieldData, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.createField.mockImplementationOnce((data, callback) => {
        callback(null);
      });

      await fieldController.createField(req, res);

      expect(FieldModel.createField).toHaveBeenCalledWith(
        { ...fieldData, user_id: 1 },
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'Field created successfully' });
    });

    test('should return 500 if creating field fails', async () => {
      const req = mockRequest(fieldData, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.createField.mockImplementationOnce((data, callback) => {
        callback(new Error('DB error'));
      });

      await fieldController.createField(req, res);

      expect(FieldModel.createField).toHaveBeenCalledWith(
        { ...fieldData, user_id: 1 },
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Creating field error' });
    });
  });

  describe('updateField', () => {
    const updateData = {
      id_field: 1,
      nama_lahan: 'Sawah Baru',
      jenis_tanah: 'Liat',
      id_tanaman: 1,
      coords: 'POLYGON((...))',
      luas_lahan: 1200,
      tanggal_tanam: '2023-01-10',
      estimasi_panen: '2023-05-10',
    };

    test('should update a field successfully', async () => {
      const req = mockRequest(updateData, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.updateField.mockImplementationOnce((id, data, callback) => {
        callback(null);
      });

      await fieldController.updateField(req, res);

      expect(FieldModel.updateField).toHaveBeenCalledWith(
        updateData.id_field,
        { ...updateData, user_id: 1 },
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'Field updated successfully' });
    });

    test('should return 500 if updating field fails', async () => {
      const req = mockRequest(updateData, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.updateField.mockImplementationOnce((id, data, callback) => {
        callback(new Error('DB error'));
      });

      await fieldController.updateField(req, res);

      expect(FieldModel.updateField).toHaveBeenCalledWith(
        updateData.id_field,
        { ...updateData, user_id: 1 },
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Updating field error' });
    });
  });

  describe('deleteField', () => {
    test('should delete a field successfully', async () => {
      const req = mockRequest({ id: 1 }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.deleteField.mockImplementationOnce((id, userId, callback) => {
        callback(null);
      });

      await fieldController.deleteField(req, res);

      expect(FieldModel.deleteField).toHaveBeenCalledWith(1, 1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Field deleted successfully' });
    });

    test('should return 500 if deleting field fails', async () => {
      const req = mockRequest({ id: 1 }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      FieldModel.deleteField.mockImplementationOnce((id, userId, callback) => {
        callback(new Error('DB error'));
      });

      await fieldController.deleteField(req, res);

      expect(FieldModel.deleteField).toHaveBeenCalledWith(1, 1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Deleting field error' });
    });
  });

  describe('getFieldById', () => {
    test('should return field data by ID successfully', async () => {
      const req = mockRequest({}, { id_field: 1 });
      const res = mockResponse();
      const mockData = [{ id_field: 1, nama_lahan: 'Sawah', user_id: 1 }];

      FieldModel.getFieldById.mockImplementationOnce((fieldId, callback) => {
        callback(null, mockData);
      });

      await fieldController.getFieldById(req, res);

      expect(FieldModel.getFieldById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching field by ID fails', async () => {
      const req = mockRequest({}, { id_field: 1 });
      const res = mockResponse();

      FieldModel.getFieldById.mockImplementationOnce((fieldId, callback) => {
        callback(new Error('DB error'), null);
      });

      await fieldController.getFieldById(req, res);

      expect(FieldModel.getFieldById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching field by ID error' });
    });
  });

  describe('getCropData', () => {
    test('should return all crop data successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockData = [{ id_tanaman: 1, nama_tanaman: 'Padi' }];

      FieldModel.getCropData.mockImplementationOnce((callback) => {
        callback(null, mockData);
      });

      await fieldController.getCropData(req, res);

      expect(FieldModel.getCropData).toHaveBeenCalledWith(expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching crop data fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      FieldModel.getCropData.mockImplementationOnce((callback) => {
        callback(new Error('DB error'), null);
      });

      await fieldController.getCropData(req, res);

      expect(FieldModel.getCropData).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getCropById', () => {
    test('should return crop data by ID successfully', async () => {
      const req = mockRequest({}, { id_tanaman: 1 });
      const res = mockResponse();
      const mockData = [{ id_tanaman: 1, nama_tanaman: 'Padi' }];

      FieldModel.getCropById.mockImplementationOnce((cropId, callback) => {
        callback(null, mockData);
      });

      await fieldController.getCropById(req, res);

      expect(FieldModel.getCropById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching crop by ID fails', async () => {
      const req = mockRequest({}, { id_tanaman: 1 });
      const res = mockResponse();

      FieldModel.getCropById.mockImplementationOnce((cropId, callback) => {
        callback(new Error('DB error'), null);
      });

      await fieldController.getCropById(req, res);

      expect(FieldModel.getCropById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('reverseGeocode', () => {
    const lat = '1.23';
    const lon = '4.56';
    const cacheDir = '/mock/path/to/cache';
    const cacheFile = `${cacheDir}/${lat.replace(/\./g, '_')}_${lon.replace(/\./g, '_')}.json`;
    const mockApiData = { address: { city: 'Test City' } };
    const mockCachedData = { address: { city: 'Cached City' }, from_cache: true, warning: "Data diambil dari cache karena API gagal." };

    beforeEach(() => {
      // Ensure path.join and path.resolve return consistent mock values
      path.join.mockImplementation((dir, file) => `${dir}/${file}`);
      path.resolve.mockReturnValue(cacheDir);
    });

    test('should return data from API and cache it if successful', async () => {
      const req = mockRequest({}, {}, { lat, lon });
      const res = mockResponse();

      fs.mkdir.mockResolvedValue();
      axios.get.mockResolvedValue({ data: mockApiData });
      fs.writeFile.mockResolvedValue();
      fs.readFile.mockRejectedValue(new Error('File not found for testing')); // Ensure cache is not read first

      await fieldController.reverseGeocode(req, res);

      expect(fs.mkdir).toHaveBeenCalledWith(cacheDir, { recursive: true });
      expect(axios.get).toHaveBeenCalledWith(
        `https://nominatim.openstreetmap.org/reverse`,
        expect.objectContaining({
          params: { lat, lon, format: 'json', 'accept-language': 'id' },
        })
      );
      expect(fs.writeFile).toHaveBeenCalledWith(cacheFile, JSON.stringify(mockApiData), 'utf-8');
      expect(res.json).toHaveBeenCalledWith(mockApiData);
    });

    test('should return data from cache if API call fails but cache exists', async () => {
      const req = mockRequest({}, {}, { lat, lon });
      const res = mockResponse();

      fs.mkdir.mockResolvedValue();
      axios.get.mockRejectedValue(new Error('Network error'));
      fs.readFile.mockResolvedValue(JSON.stringify(mockCachedData));

      await fieldController.reverseGeocode(req, res);

      expect(fs.mkdir).toHaveBeenCalledWith(cacheDir, { recursive: true });
      expect(axios.get).toHaveBeenCalledTimes(1); // Should try API first
      expect(fs.readFile).toHaveBeenCalledWith(cacheFile, 'utf-8');
      expect(res.json).toHaveBeenCalledWith(mockCachedData);
    });

    test('should return 400 if lat or lon parameters are missing', async () => {
      const req = mockRequest({}, {}, { lat: '1.23' }); // Missing lon
      const res = mockResponse();

      await fieldController.reverseGeocode(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing lat or lon parameter' });
      expect(axios.get).not.toHaveBeenCalled();
    });

    test('should return 500 if both API and cache fail', async () => {
      const req = mockRequest({}, {}, { lat, lon });
      const res = mockResponse();

      fs.mkdir.mockResolvedValue();
      axios.get.mockRejectedValue(new Error('API failed'));
      fs.readFile.mockRejectedValue(new Error('Cache failed'));

      await fieldController.reverseGeocode(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Gagal mengambil data dari API dan cache.",
        error: "API failed",
      });
    });
  });
});