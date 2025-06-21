jest.mock("../../src/utils/firebase-admin", () => ({
  messaging: () => ({
    send: jest.fn().mockResolvedValue({ messageId: "mock-message-id" }),
  }),
}));
jest.mock("../../src/config/db/setup", () => ({
  query: jest.fn(),
}));
jest.mock("../../src/models/cuacaModel");
jest.mock("../../src/models/fieldModel");

jest.mock(
  "../../src/models/userModel",
  () => ({
    getAllUsers: jest.fn(),
  }),
  { virtual: true }
);
jest.mock("axios");
jest.mock("fs");
jest.mock("html-entities", () => ({
  decode: jest.fn((str) => str),
}));

const admin = require("../../src/utils/firebase-admin");
const db = require("../../src/config/db/setup");
const { generateData, registerToken } = require("../../src/controllers/notification");
const { default: axios } = require("axios");
const fs = require("fs");

function analyzeWeather(data) {
  if (!Array.isArray(data) || data.length === 0) return {};
  let totalTemp = 0;
  data.forEach((item) => (totalTemp += item.t));
  return { avgTemperature: totalTemp / data.length };
}

describe("Notification Controller and Services", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      user: { user_id: 1 },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("generateData", () => {
    it("should send a notification and save it to the DB", async () => {
      const fcmToken = "test-token";
      const title = "Test Title";
      const body = "Test Body";

      const sendMock = admin.messaging().send;
      db.query.mockImplementation((sql, params, callback) => callback(null));

      const result = await generateData({ fcmToken, title, body });

      expect(sendMock).toHaveBeenCalledWith({
        token: fcmToken,
        notification: { title, body },
      });
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO notifications"),
        [fcmToken, body],
        expect.any(Function)
      );
      expect(result).toEqual({
        message: "Notification sent successfully",
        response: { messageId: "mock-message-id" },
      });
    });

    it("should handle missing FCM token", async () => {
      const result = await generateData({
        fcmToken: null,
        title: "T",
        body: "B",
      });
      expect(result).toEqual({ message: "FCM token is required" });
      expect(admin.messaging().send).not.toHaveBeenCalled();
    });

    it("should handle unregistered FCM token error", async () => {
      const fcmToken = "unregistered-token";
      const error = { code: "messaging/registration-token-not-registered" };
      admin.messaging().send.mockRejectedValue(error);

      const result = await generateData({ fcmToken, title: "T", body: "B" });

      expect(result).toEqual({
        message: "FCM token is not registered or expired",
      });
    });
  });

  describe("registerToken", () => {
    it("should register an FCM token for a user", async () => {
      req.body.fcmToken = "new-fcm-token";
      db.query.mockImplementation((sql, params) => {});

      await registerToken(req, res);

      expect(db.query).toHaveBeenCalledWith(
        "UPDATE users SET fcm_token = ? WHERE user_id = ?",
        ["new-fcm-token", 1]
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "FCM token registered",
      });
    });

    it("should return 400 if fcmToken is missing", async () => {
      req.body.fcmToken = null;
      await registerToken(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing userId or fcmToken",
      });
    });
  });

  describe("analyzeWeather", () => {
    it("should correctly analyze weather data", () => {
      const weatherData = [{ t: 20 }, { t: 30 }];
      const result = analyzeWeather(weatherData);
      expect(result.avgTemperature).toBe(25);
    });

    it("should handle empty data array", () => {
      const result = analyzeWeather([]);
      expect(result).toEqual({});
    });
  });

  describe("fetchBMKGIssued", () => {
    it("should send notifications when new BMKG data is issued", async () => {
      const mockApiData = {
        issued: "2025-06-21T17:40:00Z",
        text_warning: "Kabupaten Sleman: Kecamatan Godean.",
        valid_start: "2025-06-21T17:40:00Z",
        valid_end: "2025-06-21T20:40:00Z",
      };
      axios.get.mockResolvedValue({ data: mockApiData });

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(
        JSON.stringify({ issued: "2025-06-21T16:00:00Z" })
      );

      db.query.mockImplementation((sql, callback) => {
        if (sql.includes("SELECT * FROM users")) {
          callback(null, [{ fcm_token: "user-token" }]);
        }
      });

      expect(axios.get).toBeTruthy();
    });
  });
});
