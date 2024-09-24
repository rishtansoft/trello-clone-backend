const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../models'); // User modeli import qilish
const { v4: uuidv4 } = require('uuid'); // unique tasdiqlash tokeni uchun


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // .env faylda JWT_SECRET o'rnatilgan bo'lishi kerak

// Nodemailer transport yaratamiz
const transporter = nodemailer.createTransport({
  service: 'Gmail', // yoki siz ishlatadigan email provayderi
  auth: {
    user: process.env.EMAIL_USER, // Email konfiguratsiya qilish
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.register = async (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // 1. Parol va tasdiqlash parolini tekshiramiz
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Parol va tasdiqlash paroli mos kelmaydi' });
  }

  // 2. Minimal parol talablari
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Parol kamida 8 ta belgidan, katta-kichik harflar, raqam va maxsus belgidan iborat bo\'lishi kerak',
    });
  }

  try {
    // 3. Email mavjudligini tekshirish
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Ushbu email allaqachon ro\'yxatdan o\'tgan' });
    }

    // 4. Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Foydalanuvchini yaratish
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerified: false, // email tasdiqlanmagan holatda bo'ladi
      emailVerificationToken: uuidv4(), // email tasdiqlash uchun token
    });

    // 6. Tasdiqlash linkini yaratish
    const verifyToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verifyToken}`;

    // 7. Tasdiqlash emailini jo'natish
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'Emailni tasdiqlash',
      text: `Emailni tasdiqlash uchun quyidagi linkni bosing: ${verificationUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Ro\'yxatdan muvaffaqiyatli o\'tdingiz! Email tasdiqlash uchun havola yuborildi.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // 1. Tokenni decode qilish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Foydalanuvchini bazadan topish
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    // 3. Email tasdiqlanganligini tekshirish
    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email allaqachon tasdiqlangan' });
    }

    // 4. Emailni tasdiqlash
    user.emailVerified = true;
    user.emailVerificationToken = null; // tokenni olib tashlaymiz
    await user.save();

    // 5. Foydalanuvchini login sahifasiga yo'naltirish
    res.status(200).json({ message: 'Email tasdiqlandi. Endi login qilishingiz mumkin' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Tasdiqlash linki noto\'g\'ri yoki amal qilish muddati o\'tgan' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Foydalanuvchini email orqali topish
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email yoki parol noto‘g‘ri' });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email yoki parol noto‘g‘ri' });
    }

    // JWT token yaratish
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Tokenning amal qilish muddati
    );

    // Javob qaytarish (token va user ma'lumotlari)
    return res.status(200).json({
      message: 'success',
      token,
      user: {
        email: user.email,
        name: user.firstName + ' ' + user.lastName, // Ism-familiya
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Foydalanuvchini email orqali qidirish
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Ushbu email mavjud emas' });
    }

    // Tiklash tokeni yaratish (token foydalanuvchi ID bilan bog‘langan)
    const resetToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' } // Tokenning amal qilish muddati 1 soat
    );

    // Email orqali yuboriladigan URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    // Email yuborish
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Parolni tiklash',
      text: `Salom, parolingizni tiklash uchun quyidagi havolaga bosing: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Parolni tiklash havolasi yuborildi' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Tokenni tekshirish
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Yaroqsiz token yoki foydalanuvchi topilmadi' });
    }

    // Yangi parolni hash qilish
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Parolni yangilash
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Parolingiz muvaffaqiyatli yangilandi' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi yoki token muddati tugagan' });
  }
};


