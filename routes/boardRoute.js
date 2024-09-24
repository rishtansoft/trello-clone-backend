const express = require('express');
const boardController = require('../controllers/boardController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Auth tekshiruvchi middleware

// Board yaratish uchun route
router.post('/create', authMiddleware, boardController.createBoard);

// Foydalanuvchiga tegishli boardlarni olish
router.get('/my-boards', authMiddleware, boardController.getUserBoards);

module.exports = router;
