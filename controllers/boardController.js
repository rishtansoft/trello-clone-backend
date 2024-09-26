// controllers/boardController.js

const jwt = require('jsonwebtoken');
const { BoardInvite, Board, User } = require('../models');
const nodemailer = require('nodemailer');

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

  // Taklif yuborish
exports.inviteToBoard = async (req, res) => {
  try {
    const { email, boardId } = req.body;

    // Board bor yoki yo'qligini tekshirish
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board topilmadi' });
    }

    // Taklif yaratish uchun token
    const token = jwt.sign({ email, boardId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Taklifni saqlash
    const invite = await BoardInvite.create({
      email,
      boardId,
      token,
    });

    console.log(84, token);

    // Emailni yuborish
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Board ga taklifnoma',
      text: `Siz boardga taklif qildingiz. Tasdiqlash uchun quyidagi havolaga bosing: http://localhost:8000/api/boards/invite/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Taklif email ${email} ga yuborildi.` });
  } catch (error) {
    console.error('Taklif yuborishda xatolik:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Taklifni tasdiqlash
exports.acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;

    // Tokenni tekshirish va ma'lumot olish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, boardId } = decoded;

    // Taklifni tekshirish
    const invite = await BoardInvite.findOne({
      where: { email, boardId, token, accepted: false },
    });

    if (!invite) {
      return res.status(400).json({ message: 'Taklif noto\'g\'ri yoki allaqachon qabul qilingan' });
    }

    // Foydalanuvchini boardga qo'shish
    await UserBoard.create({
      userId: req.user.id, // Token orqali tekshirilgan foydalanuvchi ID
      boardId,
    });

    // Taklifni yangilash (accepted = true)
    invite.accepted = true;
    await invite.save();

    res.status(200).json({ message: 'Boardga muvaffaqiyatli qo\'shildingiz' });
  } catch (error) {
    console.error('Taklifni tasdiqlashda xatolik:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

exports.removeUserFromBoard = async (req, res) => {
  try {
    const { email, boardId } = req.body; // Email va board ID'sini oling

    // Foydalanuvchini topish
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    // Board'dan foydalanuvchini o'chirish
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board topilmadi' });
    }

    // Agar board'ga foydalanuvchi qo'shilmagan bo'lsa, xabar bering
    if (!board.Users || !board.Users.some(u => u.id === user.id)) {
      return res.status(400).json({ message: 'Foydalanuvchi boardda mavjud emas' });
    }

    // Foydalanuvchini board'dan o'chirish
    await board.removeUser(user.id); // Sequelize usuli bilan o'chirish

    res.status(200).json({ message: 'Foydalanuvchi boarddan muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    console.error('Foydalanuvchini o\'chirishda xatolik:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};
