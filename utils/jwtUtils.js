const jwt = require('jsonwebtoken');

const JWT_SECRET = 'gHs4Pmcw0wGb2ziF8IKTaQ2aQv1AhAY8';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  JWT_SECRET,
  generateToken,
};