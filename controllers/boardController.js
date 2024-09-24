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

exports.getUserBoards = async (req, res) => {
    try {
      const userId = req.user.id; // Auth middleware orqali foydalanuvchi ID sini olamiz
  
      // Foydalanuvchiga tegishli barcha boardlarni olish
      const boards = await Board.findAll({
        where: {
          userId: userId,
        },
      });
  
      if (boards.length === 0) {
        return res.status(404).json({ message: 'Sizda hech qanday board mavjud emas' });
      }
  
      res.status(200).json({
        message: 'Foydalanuvchiga tegishli boardlar',
        boards: boards,
      });
    } catch (error) {
      console.error('Boardlarni olishda xatolik:', error);
      res.status(500).json({ message: 'Server xatosi' });
    }
  };
