const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Authorization header'ini olish
  const authHeader = req.headers['authorization'];

  // Tokenni olish
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Agar token yo'q bo'lsa
  if (!token) {
    return res.status(403).json({ message: 'Token topilmadi' });
  }

  // Tokenni tekshirish
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Tokenni tekshirishda xatolik:', err);
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Foydalanuvchi ma'lumotlarini req.user ga qo'shish
    req.user = decoded;
    next(); // Keyingi middleware yoki route handler ga o'tish
  });
};

module.exports = authMiddleware;
