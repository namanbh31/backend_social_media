const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/follow', authenticateToken, userController.followUser);
router.get('/profile', authenticateToken, userController.profile);
router.get('/query-user', authenticateToken, userController.queryUser);
router.get('/followers', authenticateToken, userController.getFollowers);
router.get('/following', authenticateToken, userController.getFollowing);



module.exports = router;