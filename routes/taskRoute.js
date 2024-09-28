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

// Task yangilash
router.put('/:taskId', authMiddleware, taskController.updateTask);

// Taskni o'chirish
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

// Taskdagi barcha izohlarni olish
router.get('/:taskId/comments', authMiddleware, taskController.getTaskComments);

module.exports = router;
