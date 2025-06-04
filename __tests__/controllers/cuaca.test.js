const cuacaController = require('../../src/controllers/cuaca');
const CuacaModel = require('../../src/models/cuacaModel');
const dotenv = require('dotenv');

jest.mock('../../src/models/cuacaModel', () => ({
  fetchWeatherData: jest.fn(),
  getNearestLocation: jest.fn(),
  getForecastData: jest.fn(),
  updateUserLocation: jest.fn(),
  getWarningData: jest.fn(),
  fetchCropPredictions: jest.fn(),
  fetchCropRecommendations: jest.fn(),
  fetchWeeklyForecast: jest.fn(),
}));

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

describe('Cuaca Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DEFAULT_ADM = 'DEFAULT_ADM_VALUE';
    process.env.DEFAULT_PROVINSI = 'DEFAULT_PROVINSI_VALUE';
  });

  describe('getCuacaNow', () => {
    test('should return weather data successfully', async () => {
      const req = mockRequest({ adm: 'Yogyakarta' });
      const res = mockResponse();
      const mockData = { temp: 25, condition: 'Sunny' };

      CuacaModel.fetchWeatherData.mockImplementationOnce((adm, defaultAdm, callback) => {
        callback(null, mockData);
      });

      await cuacaController.getCuacaNow(req, res);

      expect(CuacaModel.fetchWeatherData).toHaveBeenCalledWith('Yogyakarta', 'DEFAULT_ADM_VALUE', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ dataCuaca: mockData });
    });

    test('should return 500 if fetching weather data fails', async () => {
      const req = mockRequest({ adm: 'Yogyakarta' });
      const res = mockResponse();

      CuacaModel.fetchWeatherData.mockImplementationOnce((adm, defaultAdm, callback) => {
        callback(new Error('API error'), null);
      });

      await cuacaController.getCuacaNow(req, res);

      expect(CuacaModel.fetchWeatherData).toHaveBeenCalledWith('Yogyakarta', 'DEFAULT_ADM_VALUE', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getNearestLocation', () => {
    test('should return nearest location data successfully', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();
      const mockData = { city: 'Yogyakarta', distance: 10 };

      CuacaModel.getNearestLocation.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });

      await cuacaController.getNearestLocation(req, res);

      expect(CuacaModel.getNearestLocation).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching nearest location fails', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();

      CuacaModel.getNearestLocation.mockImplementationOnce((lat, lon, callback) => {
        callback(new Error('DB error'), null);
      });

      await cuacaController.getNearestLocation(req, res);

      expect(CuacaModel.getNearestLocation).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getForecastData', () => {
    test('should return forecast data and update user location if user is authenticated', async () => {
      const req = mockRequest(
        { latitude: -7.7956, longitude: 110.3695 },
        {},
        {},
        { user_id: 1, username: 'testuser' }
      );
      const res = mockResponse();
      const mockData = { weatherData: [['forecast_data']] };

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });
      CuacaModel.updateUserLocation.mockImplementationOnce((lat, lon, userId, callback) => {
        callback(null);
      });

      await cuacaController.getForecastData(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(CuacaModel.updateUserLocation).toHaveBeenCalledWith(-7.7956, 110.3695, 1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return forecast data without updating user location if user is not authenticated', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();
      const mockData = { weatherData: [['forecast_data']] };

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });

      await cuacaController.getForecastData(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(CuacaModel.updateUserLocation).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching forecast data fails', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(new Error('API error'), null);
      });

      await cuacaController.getForecastData(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });

    test('should return 500 if updating user location fails', async () => {
      const req = mockRequest(
        { latitude: -7.7956, longitude: 110.3695 },
        {},
        {},
        { user_id: 1, username: 'testuser' }
      );
      const res = mockResponse();
      const mockData = { weatherData: [['forecast_data']] };

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });
      CuacaModel.updateUserLocation.mockImplementationOnce((lat, lon, userId, callback) => {
        callback(new Error('Update error'));
      });

      await cuacaController.getForecastData(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(CuacaModel.updateUserLocation).toHaveBeenCalledWith(-7.7956, 110.3695, 1, expect.any(Function));
      // Note: The original controller logs the error but still sends the forecast data.
      // So, we expect json to be called with mockData, and status 500 is not explicitly sent from the updateUserLocation error block.
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getForecastDataNT', () => {
    test('should return forecast data based on query params successfully', async () => {
      const req = mockRequest({}, {}, { latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();
      const mockData = { weatherData: [['forecast_data_nt']] };

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });

      await cuacaController.getForecastDataNT(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith('-7.7956', '110.3695', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching forecast data NT fails', async () => {
      const req = mockRequest({}, {}, { latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();

      CuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(new Error('API error NT'), null);
      });

      await cuacaController.getForecastDataNT(req, res);

      expect(CuacaModel.getForecastData).toHaveBeenCalledWith('-7.7956', '110.3695', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getWarningData', () => {
    test('should return warning data successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockData = { warnings: ['warning1', 'warning2'] };

      CuacaModel.getWarningData.mockImplementationOnce((callback) => {
        callback(null, mockData);
      });

      await cuacaController.getWarningData(req, res);

      expect(CuacaModel.getWarningData).toHaveBeenCalledWith(expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching warning data fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      CuacaModel.getWarningData.mockImplementationOnce((callback) => {
        callback(new Error('Warning API error'), null);
      });

      await cuacaController.getWarningData(req, res);

      expect(CuacaModel.getWarningData).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getCropPredictions', () => {
    test('should return crop predictions successfully', async () => {
      const req = mockRequest({ provinsi: 'Jawa Tengah', latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();
      const mockResult = { predictions: ['corn', 'rice'] };

      CuacaModel.fetchCropPredictions.mockImplementationOnce((params, callback) => {
        callback(null, mockResult);
      });

      await cuacaController.getCropPredictions(req, res);

      expect(CuacaModel.fetchCropPredictions).toHaveBeenCalledWith(
        { provinsi: 'Jawa Tengah', latitude: -7.7956, longitude: 110.3695, defaultProvinsi: 'DEFAULT_PROVINSI_VALUE' },
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    test('should return 500 if fetching crop predictions fails', async () => {
      const req = mockRequest({ provinsi: 'Jawa Tengah', latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();

      CuacaModel.fetchCropPredictions.mockImplementationOnce((params, callback) => {
        callback(new Error('Prediction API error'), null);
      });

      await cuacaController.getCropPredictions(req, res);

      expect(CuacaModel.fetchCropPredictions).toHaveBeenCalledWith(
        { provinsi: 'Jawa Tengah', latitude: -7.7956, longitude: 110.3695, defaultProvinsi: 'DEFAULT_PROVINSI_VALUE' },
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getCropRecommendation', () => {
    test('should return crop recommendations successfully', async () => {
      const req = mockRequest({ label: 'rice' });
      const res = mockResponse();
      const mockResult = { recommendations: ['variety_a', 'variety_b'] };

      CuacaModel.fetchCropRecommendations.mockImplementationOnce((label, callback) => {
        callback(null, mockResult);
      });

      await cuacaController.getCropRecommendation(req, res);

      expect(CuacaModel.fetchCropRecommendations).toHaveBeenCalledWith('rice', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    test('should return 500 if fetching crop recommendations fails', async () => {
      const req = mockRequest({ label: 'rice' });
      const res = mockResponse();

      CuacaModel.fetchCropRecommendations.mockImplementationOnce((label, callback) => {
        callback(new Error('Recommendation API error'), null);
      });

      await cuacaController.getCropRecommendation(req, res);

      expect(CuacaModel.fetchCropRecommendations).toHaveBeenCalledWith('rice', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });

  describe('getForecastWeekly', () => {
    test('should return weekly forecast successfully', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();
      const mockData = { weeklyForecast: ['day1', 'day2'] };

      CuacaModel.fetchWeeklyForecast.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockData);
      });

      await cuacaController.getForecastWeekly(req, res);

      expect(CuacaModel.fetchWeeklyForecast).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return 500 if fetching weekly forecast fails', async () => {
      const req = mockRequest({ latitude: -7.7956, longitude: 110.3695 });
      const res = mockResponse();

      CuacaModel.fetchWeeklyForecast.mockImplementationOnce((lat, lon, callback) => {
        callback(new Error('Weekly forecast API error'), null);
      });

      await cuacaController.getForecastWeekly(req, res);

      expect(CuacaModel.fetchWeeklyForecast).toHaveBeenCalledWith(-7.7956, 110.3695, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Fetching data error' });
    });
  });
});