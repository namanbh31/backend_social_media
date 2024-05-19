const express = require('express');
const feedController = require('../controllers/feedController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, feedController.getFeed);

module.exports = router;