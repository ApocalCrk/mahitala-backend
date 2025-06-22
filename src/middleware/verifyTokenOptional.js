const jwt = require("jsonwebtoken");

const verifyTokenOptional = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your_secret_key'; 
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
};

module.exports = verifyTokenOptional;
