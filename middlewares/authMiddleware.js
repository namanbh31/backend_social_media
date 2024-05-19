const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];


  if (!token) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  jwt.verify(token, jwtUtils.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;