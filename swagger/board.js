/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: "Yangi board yaratish"
 *     description: "Foydalanuvchi yangi board yaratadi."
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My New Board"
 *               description:
 *                 type: string
 *                 example: "Board description"
 *               color:
 *                 type: string
 *                 example: "green"
 *     responses:
 *       201:
 *         description: "Board muvaffaqiyatli yaratildi"
 *       400:
 *         description: "Xato. Ma'lumotlar noto'g'ri"
 */

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: "Foydalanuvchiga tegishli barcha boardlarni olish"
 *     description: "Foydalanuvchi yaratgan barcha boardlarni olish"
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: "Boardlar muvaffaqiyatli qaytarildi"
 *       404:
 *         description: "Board topilmadi"
 */
