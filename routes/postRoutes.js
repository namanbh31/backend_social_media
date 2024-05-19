const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, postController.createPost);
router.post('/:postId/like', authenticateToken, postController.likePost);
router.post('/:postId/comments', authenticateToken, postController.commentOnPost);
router.get('/:postId', authenticateToken, postController.getPost);

module.exports = router;