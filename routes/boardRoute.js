const express = require('express');
const boardController = require('../controllers/boardController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Auth tekshiruvchi middleware

// Board yaratish uchun route
router.post('/create', authMiddleware, boardController.createBoard);

// Foydalanuvchiga tegishli boardlarni olish
router.get('/my-boards', authMiddleware, boardController.getUserBoards);

// Boardga taklif yuborish va taklifni qabul qilish uchun routelar
router.post('/invite', authMiddleware, boardController.inviteToBoard);
router.get('/invite/:token', authMiddleware, boardController.acceptInvite);
// Foydalanuvchini boarddan o'chirish
router.delete('/remove-user', authMiddleware, boardController.removeUserFromBoard);

module.exports = router;
