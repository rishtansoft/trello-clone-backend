// controllers/boardController.js

const { Board } = require('../models');

exports.createBoard = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    
    const userId = req.user.id; // Auth middleware orqali foydalanuvchi ID sini olamiz

    // Validatsiya
    if (!name) {
      return res.status(400).json({ message: 'Name maydoni majburiy' });
    }
    if (!color || !['orange', 'gray', 'green', 'red'].includes(color)) {
      return res.status(400).json({ message: 'Iltimos, rangni orange, gray, green yoki red dan birini tanlang' });
    }

    // Board yaratish
    const newBoard = await Board.create({
      name,
      description,
      color,
      userId
    });

    res.status(201).json({
      message: 'Board muvaffaqiyatli yaratildi',
      board: newBoard
    });
  } catch (error) {
    console.error('Board yaratishda xatolik:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};
