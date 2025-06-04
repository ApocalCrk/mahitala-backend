const authController = require('../../src/controllers/auth');
const AuthModel = require('../../src/models/authModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Mock AuthModel
jest.mock('../../src/models/authModel', () => ({
  isUsernameTaken: jest.fn(),
  createUser: jest.fn(),
  getUserByUsername: jest.fn(),
  isTokenValid: jest.fn(),
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock dotenv config
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

describe('Auth Controller', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret'; // Set a dummy secret for testing
  });

  describe('register', () => {
    test('should register a new user successfully', async () => {
      const req = mockRequest({ username: 'testuser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.isUsernameTaken.mockImplementationOnce((username, callback) => {
        callback(null, []); // Username not taken
      });
      AuthModel.createUser.mockImplementationOnce((user, callback) => {
        callback(null, { insertId: 1 }); // User created successfully
      });
      jwt.sign.mockReturnValueOnce('mocked_jwt_token');

      await authController.register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(AuthModel.createUser).toHaveBeenCalledWith({ username: 'testuser', token: 'dummytoken' }, expect.any(Function));
      expect(jwt.sign).toHaveBeenCalledWith({ user_id: 1, username: 'testuser', token: 'dummytoken' }, 'test_secret');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Registrasi berhasil',
        token: 'mocked_jwt_token',
      });
    });

    test('should return 400 if username is already taken', async () => {
      const req = mockRequest({ username: 'existinguser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.isUsernameTaken.mockImplementationOnce((username, callback) => {
        callback(null, [{ username: 'existinguser' }]); // Username taken
      });

      await authController.register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith('existinguser', expect.any(Function));
      expect(AuthModel.createUser).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username telah terdaftar' });
    });

    test('should return 500 if there is a database error when checking username', async () => {
      const req = mockRequest({ username: 'testuser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.isUsernameTaken.mockImplementationOnce((username, callback) => {
        callback(new Error('DB error'), null);
      });

      await authController.register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(AuthModel.createUser).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should return 500 if there is a database error during user creation', async () => {
      const req = mockRequest({ username: 'testuser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.isUsernameTaken.mockImplementationOnce((username, callback) => {
        callback(null, []);
      });
      AuthModel.createUser.mockImplementationOnce((user, callback) => {
        callback(new Error('User creation error'), null);
      });

      await authController.register(req, res);

      expect(AuthModel.isUsernameTaken).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(AuthModel.createUser).toHaveBeenCalledWith({ username: 'testuser', token: 'dummytoken' }, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error: Creating user error' });
    });
  });

  describe('login', () => {
    test('should log in a user successfully', async () => {
      const req = mockRequest({ username: 'testuser', token: 'validtoken' });
      const res = mockResponse();

      const mockUser = { user_id: 1, username: 'testuser', token: 'validtoken' };
      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(null, [mockUser]);
      });
      AuthModel.isTokenValid.mockReturnValueOnce(true);
      jwt.sign.mockReturnValueOnce('mocked_jwt_token');

      await authController.login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(AuthModel.isTokenValid).toHaveBeenCalledWith('validtoken', 'validtoken');
      expect(jwt.sign).toHaveBeenCalledWith({ user_id: 1, username: 'testuser' }, 'test_secret');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login berhasil',
        token: 'mocked_jwt_token',
        user: {
          user_id: 1,
          username: 'testuser',
          token: 'validtoken',
        },
      });
    });

    test('should return 400 if username is not found', async () => {
      const req = mockRequest({ username: 'nonexistentuser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(null, []);
      });

      await authController.login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('nonexistentuser', expect.any(Function));
      expect(AuthModel.isTokenValid).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username tidak ditemukan' });
    });

    test('should return 400 if token is invalid', async () => {
      const req = mockRequest({ username: 'testuser', token: 'invalidtoken' });
      const res = mockResponse();

      const mockUser = { user_id: 1, username: 'testuser', token: 'correcttoken' };
      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(null, [mockUser]);
      });
      AuthModel.isTokenValid.mockReturnValueOnce(false);

      await authController.login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(AuthModel.isTokenValid).toHaveBeenCalledWith('invalidtoken', 'correcttoken');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token tidak valid' });
    });

    test('should return 500 if there is a database error when getting user', async () => {
      const req = mockRequest({ username: 'testuser', token: 'dummytoken' });
      const res = mockResponse();

      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(new Error('DB error'), null);
      });

      await authController.login(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('checkUser', () => {
    test('should return user details if user exists', async () => {
      const req = mockRequest({}, {}, {}, { username: 'testuser' });
      const res = mockResponse();

      const mockUser = { user_id: 1, username: 'testuser', token: 'dummytoken' };
      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(null, [mockUser]);
      });

      await authController.checkUser(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({
        user_id: 1,
        username: 'testuser',
        token: 'dummytoken',
      });
    });

    test('should return 400 if username is not found', async () => {
      const req = mockRequest({}, {}, {}, { username: 'nonexistentuser' });
      const res = mockResponse();

      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(null, []);
      });

      await authController.checkUser(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('nonexistentuser', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username tidak ditemukan' });
    });

    test('should return 500 if there is a database error', async () => {
      const req = mockRequest({}, {}, {}, { username: 'testuser' });
      const res = mockResponse();

      AuthModel.getUserByUsername.mockImplementationOnce((username, callback) => {
        callback(new Error('DB error'), null);
      });

      await authController.checkUser(req, res);

      expect(AuthModel.getUserByUsername).toHaveBeenCalledWith('testuser', expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});