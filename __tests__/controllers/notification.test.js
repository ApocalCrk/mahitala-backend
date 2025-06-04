const { averageWeatherToday, registerToken } = require('../../src/controllers/notification');
const admin = require('../../src/utils/firebase-admin');
const db = require('../../src/config/db/setup');
const cuacaModel = require('../../src/models/cuacaModel');
const fieldModel = require('../../src/models/fieldModel');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { decode } = require("html-entities");

// Mock external modules
jest.mock('../../src/utils/firebase-admin', () => ({
  messaging: () => ({
    send: jest.fn(),
  }),
}));
jest.mock('../../src/config/db/setup', () => ({
  query: jest.fn(),
}));
jest.mock('../../src/models/cuacaModel', () => ({
  getForecastData: jest.fn(),
}));
jest.mock('../../src/models/fieldModel', () => ({
  getFieldByUserID: jest.fn(),
}));
jest.mock('axios');
jest.mock('fs'); // Mock fs for fs.existsSync and fs.readFileSync/writeFileSync
jest.mock('path');
jest.mock('html-entities');
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

// Internal helper for mocking cron tasks, not directly exported by controller
// We need to test the functions that cron tasks call, not the cron schedule itself.
const fetchBMKGIssued = require('../../src/controllers/notification').fetchBMKGIssued; // Expose for testing
const weatherCondition = require('../../src/controllers/notification').weatherCondition; // Expose for testing
const automationEstimatedCrop = require('../../src/controllers/notification').automationEstimatedCrop; // Expose for testing

describe('Notification Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fs methods used by fetchBMKGIssued
    fs.existsSync.mockReturnValue(false);
    fs.readFileSync.mockReturnValue('');
    fs.writeFileSync.mockReturnValue(undefined);
    path.join.mockReturnValue('/mock/path/to/cache/bmkg-issued.json'); // Consistent mock path
    process.env.API_WARNING_BMKG = 'http://mock-bmkg-api.com/warning';
  });

  describe('fetchBMKGIssued (internal function)', () => {
    test('should send notification if new BMKG data is issued', async () => {
      const mockAxiosResponse = {
        data: {
          issued: '2023-01-01 10:00:00',
          text_warning: '<p>Hujan lebat di Kabupaten Sleman (Kecamatan: Depok), Kota Yogyakarta (Kecamatan: Gondokusuman).</p>',
          valid_start: '2023-01-01 10:00:00',
          valid_end: '2023-01-01 12:00:00',
        },
      };
      axios.get.mockResolvedValue(mockAxiosResponse);
      db.query.mockImplementation((sql, callback) => {
        if (sql.includes('SELECT * FROM users')) {
          callback(null, [{ fcm_token: 'token1' }, { fcm_token: 'token2' }]);
        } else if (sql.includes('INSERT INTO notifications')) {
          callback(null);
        }
      });
      admin.messaging().send.mockResolvedValue({ messageId: 'msg123' });
      decode.mockImplementation((text) => text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

      await fetchBMKGIssued();

      expect(axios.get).toHaveBeenCalledWith(process.env.API_WARNING_BMKG);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/to/cache/bmkg-issued.json',
        JSON.stringify({ issued: '2023-01-01 10:00:00' }, null, 2),
        expect.any(String)
      );
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users', expect.any(Function));
      expect(admin.messaging().send).toHaveBeenCalledTimes(2); // For each user
      expect(admin.messaging().send).toHaveBeenCalledWith(expect.objectContaining({
        token: 'token1',
        notification: expect.objectContaining({
          title: 'Peringatan Cuaca Ekstrem di Yogyakarta',
          body: 'BMKG: Hujan lebat dan petir berpotensi terjadi di Sleman, Gondokusuman pada 2023-01-01, 10:00 - 12:00 WIB.',
        }),
      }));
    });

    test('should not send notification if BMKG data is not new', async () => {
      const mockAxiosResponse = {
        data: {
          issued: '2023-01-01 10:00:00',
          text_warning: '...',
          valid_start: '...',
          valid_end: '...',
        },
      };
      axios.get.mockResolvedValue(mockAxiosResponse);
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({ issued: '2023-01-01 10:00:00' }));

      await fetchBMKGIssued();

      expect(axios.get).toHaveBeenCalledWith(process.env.API_WARNING_BMKG);
      expect(fs.readFileSync).toHaveBeenCalledWith('/mock/path/to/cache/bmkg-issued.json', 'utf8');
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should handle invalid issued date from BMKG API', async () => {
      const mockAxiosResponse = {
        data: {
          issued: 'INVALID_DATE',
          text_warning: '...',
          valid_start: '...',
          valid_end: '...',
        },
      };
      axios.get.mockResolvedValue(mockAxiosResponse);

      await fetchBMKGIssued();

      expect(axios.get).toHaveBeenCalledWith(process.env.API_WARNING_BMKG);
      expect(admin.messaging().send).not.toHaveBeenCalled(); // No notification sent due to invalid date
      expect(console.warn).toHaveBeenCalledWith("Tanggal issued tidak valid:", 'INVALID_DATE'); // Assuming console.warn is mocked or captured
    });

    test('should gracefully handle axios error', async () => {
      axios.get.mockRejectedValue(new Error('Network error'));

      await fetchBMKGIssued();

      expect(axios.get).toHaveBeenCalledWith(process.env.API_WARNING_BMKG);
      expect(admin.messaging().send).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Gagal fetch atau proses data BMKG:', 'Network error');
    });

    test('should gracefully handle database error when fetching users', async () => {
      axios.get.mockResolvedValue({ data: { issued: '2023-01-02 10:00:00', text_warning: '...', valid_start: '...', valid_end: '...' } });
      db.query.mockImplementationOnce((sql, callback) => {
        if (sql.includes('SELECT * FROM users')) {
          callback(new Error('DB users error'), null);
        }
      });

      await fetchBMKGIssued();

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users', expect.any(Function));
      expect(admin.messaging().send).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error fetching users:', expect.any(Error));
    });
  });

  describe('weatherCondition (internal function)', () => {
    test('should send weather warning notification if condition is within range', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1', lat: -7.7, lon: 110.3 }];
      const mockForecastData = { weatherData: [[{ weather: 65, weather_desc: 'Hujan Ringan', t: 25 }]] };

      db.query.mockImplementationOnce((sql, callback) => {
        callback(null, mockUsers);
      });
      cuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockForecastData);
      });
      admin.messaging().send.mockResolvedValue({ messageId: 'msg456' });
      db.query.mockImplementation((sql, callback) => { // for notification insertion
        callback(null);
      });

      await weatherCondition();

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users', expect.any(Function));
      expect(cuacaModel.getForecastData).toHaveBeenCalledWith(-7.7, 110.3, expect.any(Function));
      expect(admin.messaging().send).toHaveBeenCalledWith(expect.objectContaining({
        token: 'token1',
        notification: {
          title: 'Peringatan Cuaca',
          body: 'Cuaca di lokasi anda Hujan Ringan dengan suhu 25°C',
        },
      }));
    });

    test('should not send notification if weather condition is outside range', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1', lat: -7.7, lon: 110.3 }];
      const mockForecastData = { weatherData: [[{ weather: 50, weather_desc: 'Cerah', t: 28 }]] }; // Weather not in range

      db.query.mockImplementationOnce((sql, callback) => {
        callback(null, mockUsers);
      });
      cuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockForecastData);
      });

      await weatherCondition();

      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should gracefully handle database error when fetching users', async () => {
      db.query.mockImplementationOnce((sql, callback) => {
        callback(new Error('DB users error'), null);
      });

      await weatherCondition();

      expect(console.error).toHaveBeenCalledWith('Error fetching tokens:', expect.any(Error));
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should gracefully handle cuacaModel error', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1', lat: -7.7, lon: 110.3 }];

      db.query.mockImplementationOnce((sql, callback) => {
        callback(null, mockUsers);
      });
      cuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(new Error('Weather API error'), null);
      });

      await weatherCondition();

      expect(console.error).toHaveBeenCalledWith('Error fetching weather data:', expect.any(Error));
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });
  });

  describe('averageWeatherToday', () => {
    test('should send average weather notification to users', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1', lat: -7.7, lon: 110.3 }];
      const mockForecastData = {
        weatherData: [
          [
            { t: 25, hu: 80, weather_desc: 'Cerah' },
            { t: 27, hu: 75, weather_desc: 'Cerah' },
            { t: 20, hu: 90, weather_desc: 'Hujan Ringan' },
          ],
        ],
      };

      db.query.mockImplementationOnce((sql, callback) => {
        callback(null, mockUsers);
      });
      cuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, mockForecastData);
      });
      admin.messaging().send.mockResolvedValue({ messageId: 'msg789' });
      db.query.mockImplementation((sql, callback) => { // for notification insertion
        callback(null);
      });

      await averageWeatherToday();

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users', expect.any(Function));
      expect(cuacaModel.getForecastData).toHaveBeenCalledWith(-7.7, 110.3, expect.any(Function));
      expect(admin.messaging().send).toHaveBeenCalledWith(expect.objectContaining({
        token: 'token1',
        notification: {
          title: 'Informasi Cuaca Hari Ini',
          body: 'Rata-rata suhu hari ini adalah 24.0°C dengan kelembapan 81.7% dan cuaca Cerah',
        },
      }));
    });

    test('should handle no weather data gracefully in averageWeatherToday', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1', lat: -7.7, lon: 110.3 }];

      db.query.mockImplementationOnce((sql, callback) => {
        callback(null, mockUsers);
      });
      cuacaModel.getForecastData.mockImplementationOnce((lat, lon, callback) => {
        callback(null, { weatherData: [] }); // No weather data
      });

      await averageWeatherToday();

      expect(admin.messaging().send).not.toHaveBeenCalled();
    });
  });

  describe('automationEstimatedCrop (internal function)', () => {
    test('should send crop estimation notification if within 7 days', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1' }];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // 5 days from now
      const mockFieldData = [{
        estimasi_panen: futureDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        nama_lahan: 'Sawah Padi',
      }];

      db.query.mockResolvedValue(mockUsers); // Mock promise-based query for users
      fieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(null, mockFieldData);
      });
      admin.messaging().send.mockResolvedValue({ messageId: 'msgCrop' });
      db.query.mockImplementation((sql, params, callback) => { // for notification insertion
        if (sql.includes('INSERT INTO notifications')) {
          callback(null);
        } else {
          callback(new Error('Unexpected query'));
        }
      });

      await automationEstimatedCrop();

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users');
      expect(fieldModel.getFieldByUserID).toHaveBeenCalledWith(1, expect.any(Function));
      expect(admin.messaging().send).toHaveBeenCalledWith(expect.objectContaining({
        token: 'token1',
        notification: {
          title: 'Estimasi Panen Sawah Padi',
          body: `Pemberitahuan Estimasi panen tanaman pada ${futureDate.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}`,
        },
      }));
    });

    test('should not send crop estimation notification if beyond 7 days', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1' }];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 10); // 10 days from now
      const mockFieldData = [{
        estimasi_panen: futureDate.toISOString().split('T')[0],
        nama_lahan: 'Sawah Padi',
      }];

      db.query.mockResolvedValue(mockUsers);
      fieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(null, mockFieldData);
      });

      await automationEstimatedCrop();

      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should handle no fields for a user gracefully', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1' }];

      db.query.mockResolvedValue(mockUsers);
      fieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(null, []); // No fields
      });

      await automationEstimatedCrop();

      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should handle error fetching users in automationEstimatedCrop', async () => {
      db.query.mockRejectedValue(new Error('DB users error'));

      await expect(automationEstimatedCrop()).rejects.toThrow('DB users error');
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    test('should handle error fetching field data for a user', async () => {
      const mockUsers = [{ user_id: 1, fcm_token: 'token1' }];

      db.query.mockResolvedValue(mockUsers);
      fieldModel.getFieldByUserID.mockImplementationOnce((userId, callback) => {
        callback(new Error('Field DB error'), null);
      });

      await automationEstimatedCrop(); // This function catches internal errors and logs them

      expect(console.error).toHaveBeenCalledWith('Error processing user 1:', expect.any(Error));
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });
  });

  describe('registerToken', () => {
    test('should register FCM token successfully', async () => {
      const req = mockRequest({ fcmToken: 'new_fcm_token' }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      db.query.mockResolvedValueOnce({}); // Mock successful update

      await registerToken(req, res);

      expect(db.query).toHaveBeenCalledWith(
        "UPDATE users SET fcm_token = ? WHERE user_id = ?",
        ['new_fcm_token', 1]
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'FCM token registered' });
    });

    test('should return 400 if userId or fcmToken is missing', async () => {
      const reqMissingToken = mockRequest({ fcmToken: 'token' }, {}, {}, {}); // Missing userId
      const res = mockResponse();

      await registerToken(reqMissingToken, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing userId or fcmToken' });
      expect(db.query).not.toHaveBeenCalled();

      const reqMissingUserId = mockRequest({}, {}, {}, { user_id: 1 }); // Missing fcmToken
      await registerToken(reqMissingUserId, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing userId or fcmToken' });
      expect(db.query).not.toHaveBeenCalled();
    });

    test('should return 500 if database update fails', async () => {
      const req = mockRequest({ fcmToken: 'new_fcm_token' }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      db.query.mockRejectedValueOnce(new Error('DB update error'));

      await registerToken(req, res);

      expect(db.query).toHaveBeenCalledWith(
        "UPDATE users SET fcm_token = ? WHERE user_id = ?",
        ['new_fcm_token', 1]
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});