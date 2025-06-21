const {
  getCuacaNow,
  getForecastData,
  getWarningData,
  getCropPredictions,
  getCropRecommendation,
  getForecastWeekly,
} = require("../../src/controllers/cuaca");
const CuacaModel = require("../../src/models/cuacaModel");

jest.mock("../../src/models/cuacaModel");

describe("Cuaca Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      query: {},
      user: null,
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("getCuacaNow", () => {
    it("should fetch weather data and return it as JSON", async () => {
      req.query = { latitude: "123", longitude: "456" };
      const mockWeatherData = { temp: 25, condition: "Sunny" };
      CuacaModel.fetchWeatherData.mockResolvedValue(mockWeatherData);

      await getCuacaNow(req, res);

      expect(CuacaModel.fetchWeatherData).toHaveBeenCalledWith("123", "456");
      expect(res.json).toHaveBeenCalledWith({ dataCuaca: mockWeatherData });
    });

    it("should update user location if a user is authenticated", async () => {
      req.query = { latitude: "123", longitude: "456" };
      req.user = { user_id: 1 };
      const mockWeatherData = { temp: 25, condition: "Sunny" };
      CuacaModel.fetchWeatherData.mockResolvedValue(mockWeatherData);
      CuacaModel.updateUserLocation.mockResolvedValue();

      await getCuacaNow(req, res);

      expect(CuacaModel.fetchWeatherData).toHaveBeenCalledWith("123", "456");
      expect(CuacaModel.updateUserLocation).toHaveBeenCalledWith(
        "123",
        "456",
        1
      );
      expect(res.json).toHaveBeenCalledWith({ dataCuaca: mockWeatherData });
    });

    it("should handle errors by returning a 500 status", async () => {
      req.query = { latitude: "123", longitude: "456" };
      const errorMessage = "API is down";
      CuacaModel.fetchWeatherData.mockRejectedValue(new Error(errorMessage));

      await getCuacaNow(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getForecastData", () => {
    it("should fetch forecast data successfully", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      const mockForecast = [{ day: "Monday", temp: 30 }];
      CuacaModel.getForecastData.mockResolvedValue(mockForecast);

      await getForecastData(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith("-7.7", "110.4");
      expect(res.json).toHaveBeenCalledWith(mockForecast);
    });

    it("should handle errors by returning a 500 status", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      CuacaModel.getForecastData.mockRejectedValue(new Error("Fetch failed"));

      await getForecastData(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getWarningData", () => {
    it("should fetch warning data successfully", async () => {
      const mockWarningData = [{ type: "Flood", severity: "High" }];
      CuacaModel.getWarningData.mockResolvedValue(mockWarningData);

      await getWarningData(req, res);

      expect(CuacaModel.getWarningData).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockWarningData);
    });

    it("should handle errors by returning a 500 status", async () => {
      CuacaModel.getWarningData.mockRejectedValue(new Error("Fetch failed"));

      await getWarningData(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getCropPredictions", () => {
    it("should fetch crop predictions successfully", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      const mockPredictions = { crop: "Rice", probability: 0.9 };
      CuacaModel.fetchCropPredictions.mockResolvedValue(mockPredictions);

      await getCropPredictions(req, res);

      expect(CuacaModel.fetchCropPredictions).toHaveBeenCalledWith({
        latitude: "-7.7",
        longitude: "110.4",
      });
      expect(res.json).toHaveBeenCalledWith(mockPredictions);
    });

    it("should handle errors by returning a 500 status", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      CuacaModel.fetchCropPredictions.mockRejectedValue(
        new Error("Fetch failed")
      );

      await getCropPredictions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getCropRecommendation", () => {
    it("should fetch crop recommendations successfully", async () => {
      req.query = { label: "Rice" };
      const mockRecommendation = { recommendation: "Plant in dry season" };
      CuacaModel.fetchCropRecommendations.mockResolvedValue(mockRecommendation);

      await getCropRecommendation(req, res);

      expect(CuacaModel.fetchCropRecommendations).toHaveBeenCalledWith("Rice");
      expect(res.json).toHaveBeenCalledWith(mockRecommendation);
    });

    it("should handle errors by returning a 500 status", async () => {
      req.query = { label: "Rice" };
      CuacaModel.fetchCropRecommendations.mockRejectedValue(
        new Error("Fetch failed")
      );

      await getCropRecommendation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });

  describe("getForecastWeekly", () => {
    it("should fetch weekly forecast data successfully", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      const mockWeeklyForecast = [{ day: "Tuesday", temp: 28 }];
      CuacaModel.fetchWeeklyForecast.mockResolvedValue(mockWeeklyForecast);

      await getForecastWeekly(req, res);

      expect(CuacaModel.fetchWeeklyForecast).toHaveBeenCalledWith(
        "-7.7",
        "110.4"
      );
      expect(res.json).toHaveBeenCalledWith(mockWeeklyForecast);
    });

    it("should handle errors by returning a 500 status", async () => {
      req.query = { latitude: "-7.7", longitude: "110.4" };
      CuacaModel.fetchWeeklyForecast.mockRejectedValue(
        new Error("Fetch failed")
      );

      await getForecastWeekly(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: Fetching data error",
      });
    });
  });
});
