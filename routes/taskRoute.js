// routes/taskRoutes.js
const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Task yaratish uchun route
router.post('/create', authMiddleware, taskController.createTask);

// Taskga foydalanuvchi tayinlash uchun route
router.post('/assign', authMiddleware, taskController.assignUserToTask);

// Boardga tegishli tasklarni olish uchun route
router.get('/:boardId', authMiddleware, taskController.getTasksByBoardId);

module.exports = router;
