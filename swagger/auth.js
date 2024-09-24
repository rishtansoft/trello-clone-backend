/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: "Foydalanuvchini ro'yxatdan o'tkazish"
 *     description: "Foydalanuvchi ro'yxatdan o'tadi va unga tasdiqlash emaili yuboriladi."
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *               confirmPassword:
 *                 type: string
 *                 example: "StrongPassword123!"
 *     responses:
 *       201:
 *         description: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi"
 *       400:
 *         description: "Xato. Ma'lumotlar noto'g'ri"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: "Foydalanuvchini tizimga kirish"
 *     description: "Foydalanuvchi login orqali tizimga kiradi va token oladi."
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: "Login muvaffaqiyatli o'tdi"
 *       400:
 *         description: "Xato. Noto'g'ri login ma'lumotlari"
 */
