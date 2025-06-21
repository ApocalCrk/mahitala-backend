const { register, login, checkUser } = require("../../src/controllers/auth");
const AuthModel = require("../../src/models/authModel");
const jwt = require("jsonwebtoken");

jest.mock("../../src/models/authModel");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
      user: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      req.body = { username: "newUser", token: "someToken" };
      const mockUser = { user_id: 1, username: "newUser", token: "someToken" };
      const mockJwtToken = "mockJwtToken";

      AuthModel.isUsernameTaken.mockResolvedValue([]);
      AuthModel.createUser.mockResolvedValue({ insertId: 1 });
      jwt.sign.mockReturnValue(mockJwtToken);

      await register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith("newUser");
      expect(AuthModel.createUser).toHaveBeenCalledWith({
        username: "newUser",
        token: "someToken",
      });
      expect(jwt.sign).toHaveBeenCalledWith(mockUser, process.env.JWT_SECRET);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Registrasi berhasil",
        token: mockJwtToken,
      });
    });

    it("should return 400 if username is already taken", async () => {
      req.body = { username: "existingUser", token: "someToken" };

      AuthModel.isUsernameTaken.mockResolvedValue([
        { username: "existingUser" },
      ]);

      await register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith("existingUser");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username telah terdaftar",
      });
    });

    it("should return 500 on a server error during registration", async () => {
      req.body = { username: "newUser", token: "someToken" };
      const errorMessage = "Database error";

      AuthModel.isUsernameTaken.mockRejectedValue(new Error(errorMessage));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Terjadi kesalahan pada server saat registrasi",
      });
    });
  });

  describe("login", () => {
    it("should login a user successfully with a valid token", async () => {
      req.body = { username: "testuser", token: "validToken" };
      const mockUser = {
        user_id: 1,
        username: "testuser",
        token: "storedToken",
      };
      const mockJwtToken = "mockJwtToken";

      AuthModel.getUserByUsername.mockResolvedValue([mockUser]);
      AuthModel.isTokenValid.mockReturnValue(true);
      jwt.sign.mockReturnValue(mockJwtToken);

      await login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith("testuser");
      expect(AuthModel.isTokenValid).toHaveBeenCalledWith(
        "validToken",
        "storedToken"
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: 1, username: "testuser" },
        process.env.JWT_SECRET
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "Login berhasil",
        token: mockJwtToken,
      });
    });

    it("should return 400 if the username is not found", async () => {
      req.body = { username: "nonexistent", token: "someToken" };

      AuthModel.getUserByUsername.mockResolvedValue([]);

      await login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith("nonexistent");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username tidak ditemukan",
      });
    });

    it("should return 400 for an invalid token", async () => {
      req.body = { username: "testuser", token: "invalidToken" };
      const mockUser = {
        user_id: 1,
        username: "testuser",
        token: "storedToken",
      };

      AuthModel.getUserByUsername.mockResolvedValue([mockUser]);
      AuthModel.isTokenValid.mockReturnValue(false);

      await login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith("testuser");
      expect(AuthModel.isTokenValid).toHaveBeenCalledWith(
        "invalidToken",
        "storedToken"
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Token tidak valid" });
    });

    it("should return 500 on a server error during login", async () => {
      req.body = { username: "testuser", token: "someToken" };
      const errorMessage = "Database error";

      AuthModel.getUserByUsername.mockRejectedValue(new Error(errorMessage));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Terjadi kesalahan pada server saat login",
      });
    });
  });

  describe("checkUser", () => {
    it("should retrieve user information successfully", async () => {
      req.user = { username: "testuser" };
      const mockUser = { user_id: 1, username: "testuser", token: "someToken" };

      AuthModel.getUserByUsername.mockResolvedValue([mockUser]);

      await checkUser(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith("testuser");
      expect(res.json).toHaveBeenCalledWith({
        user_id: 1,
        username: "testuser",
        token: "someToken",
      });
    });

    it("should return 404 if the user is not found", async () => {
      req.user = { username: "nonexistent" };

      AuthModel.getUserByUsername.mockResolvedValue([]);

      await checkUser(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith("nonexistent");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username tidak ditemukan",
      });
    });

    it("should return 500 on a server error", async () => {
      req.user = { username: "testuser" };
      const errorMessage = "Database error";

      AuthModel.getUserByUsername.mockRejectedValue(new Error(errorMessage));

      await checkUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Terjadi kesalahan pada server",
      });
    });
  });
});
