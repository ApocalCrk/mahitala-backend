const kategoriController = require('../../src/controllers/kategori');
const KategoriModel = require('../../src/models/kategoriModel');

jest.mock('../../src/models/kategoriModel', () => ({
  getAllKategori: jest.fn(),
  getBestKategori: jest.fn(),
  getKategoriById: jest.fn(),
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

describe('Kategori Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllKategori', () => {
    test('should return all categories successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockResult = [{ id_kategori: 1, nama: 'Padi' }, { id_kategori: 2, nama: 'Jagung' }];

      KategoriModel.getAllKategori.mockImplementationOnce((callback) => {
        callback(null, mockResult);
      });

      await kategoriController.getAllKategori(req, res);

      expect(KategoriModel.getAllKategori).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockResult);
    });

    test('should return 500 if fetching all categories fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      KategoriModel.getAllKategori.mockImplementationOnce((callback) => {
        callback(new Error('DB error'), null);
      });

      await kategoriController.getAllKategori(req, res);

      expect(KategoriModel.getAllKategori).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getBestKategori', () => {
    test('should return best categories successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockResult = [{ id_kategori: 1, nama: 'Padi', count: 10 }, { id_kategori: 3, nama: 'Sayuran', count: 7 }];

      KategoriModel.getBestKategori.mockImplementationOnce((callback) => {
        callback(null, mockResult);
      });

      await kategoriController.getBestKategori(req, res);

      expect(KategoriModel.getBestKategori).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockResult);
    });

    test('should return 500 if fetching best categories fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      KategoriModel.getBestKategori.mockImplementationOnce((callback) => {
        callback(new Error('DB error'), null);
      });

      await kategoriController.getBestKategori(req, res);

      expect(KategoriModel.getBestKategori).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getKategoriById', () => {
    test('should return a category by ID successfully', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();
      const mockResult = [{ id_kategori: 1, nama: 'Padi' }];

      KategoriModel.getKategoriById.mockImplementationOnce((id, callback) => {
        callback(null, mockResult);
      });

      await kategoriController.getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockResult);
    });

    test('should return 404 if category not found', async () => {
      const req = mockRequest({}, { id: 99 });
      const res = mockResponse();
      const notFoundError = new Error('Kategori not found');
      notFoundError.message = 'Kategori not found'; // Simulate how your model might return specific errors

      KategoriModel.getKategoriById.mockImplementationOnce((id, callback) => {
        callback(notFoundError, null);
      });

      await kategoriController.getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(99, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Kategori not found' });
    });

    test('should return 500 if fetching category by ID fails with generic error', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();

      KategoriModel.getKategoriById.mockImplementationOnce((id, callback) => {
        callback(new Error('DB error'), null);
      });

      await kategoriController.getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});