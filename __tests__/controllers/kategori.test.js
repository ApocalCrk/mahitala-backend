const {
  getAllKategori,
  getBestKategori,
  getKategoriById,
} = require("../../src/controllers/kategori");
const KategoriModel = require("../../src/models/kategoriModel");

jest.mock("../../src/models/kategoriModel");

describe("Kategori Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("getAllKategori", () => {
    it("should fetch all categories and return them with a 200 status", async () => {
      const mockKategori = [
        { id: 1, nama: "Pupuk" },
        { id: 2, nama: "Hama" },
      ];
      KategoriModel.getAllKategori.mockResolvedValue(mockKategori);

      await getAllKategori(req, res);

      expect(KategoriModel.getAllKategori).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockKategori);
    });

    it("should return a 500 status on a server error", async () => {
      const errorMessage = "Database connection failed";
      KategoriModel.getAllKategori.mockRejectedValue(new Error(errorMessage));

      await getAllKategori(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: errorMessage,
      });
    });
  });

  describe("getBestKategori", () => {
    it("should fetch the best categories and return them with a 200 status", async () => {
      const mockBestKategori = [
        { id: 1, nama: "Pupuk", total_diskusi: 50 },
        { id: 3, nama: "Tips & Trik", total_diskusi: 45 },
      ];
      KategoriModel.getBestKategori.mockResolvedValue(mockBestKategori);

      await getBestKategori(req, res);

      expect(KategoriModel.getBestKategori).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBestKategori);
    });

    it("should return a 500 status on a server error", async () => {
      const errorMessage = "Query failed";
      KategoriModel.getBestKategori.mockRejectedValue(new Error(errorMessage));

      await getBestKategori(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: errorMessage,
      });
    });
  });

  describe("getKategoriById", () => {
    it("should fetch a single category by ID and return it with a 200 status", async () => {
      req.params.id = 1;
      const mockKategori = { id: 1, nama: "Pupuk" };
      KategoriModel.getKategoriById.mockResolvedValue(mockKategori);

      await getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockKategori);
    });

    it("should return a 404 status when the category is not found", async () => {
      req.params.id = 99;
      const errorMessage = "Kategori tidak ditemukan";
      KategoriModel.getKategoriById.mockRejectedValue(new Error(errorMessage));

      await getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(99);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it("should return a 500 status for other server errors", async () => {
      req.params.id = 1;
      const errorMessage = "A different server error";
      KategoriModel.getKategoriById.mockRejectedValue(new Error(errorMessage));

      await getKategoriById(req, res);

      expect(KategoriModel.getKategoriById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: errorMessage,
      });
    });
  });
});
