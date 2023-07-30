const jwt = require('jsonwebtoken');
const config = require('../config/database');


const SECRET_KEY = config.secret; // Replace this with your actual secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    // Attach the decoded token payload to the request object for use in other routes
    req.user = decoded;

    // Continue with the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
