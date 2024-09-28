// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Taskga izoh yozish
router.post('/:taskId', authMiddleware, commentController.addComment);

module.exports = router;
