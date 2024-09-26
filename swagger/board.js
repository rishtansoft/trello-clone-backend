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


/**
 * @swagger
 * /api/board/invite-user:
 *   post:
 *     summary: "Boardga foydalanuvchini taklif qilish"
 *     description: "Foydalanuvchiga email orqali boardga taklif yuboriladi."
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "invitee@example.com"
 *               boardId:
 *                 type: string
 *                 example: "48db-b9e3-9c9534a36398"
 *     responses:
 *       200:
 *         description: "Taklif muvaffaqiyatli yuborildi"
 *       404:
 *         description: "Board topilmadi yoki foydalanuvchi topilmadi"
 *       500:
 *         description: "Server xatosi"
 */


/**
 * @swagger
 * /api/board/remove-user:
 *   delete:
 *     summary: "Boarddan foydalanuvchini o'chirish"
 *     description: "Foydalanuvchini emaili orqali boarddan o'chiradi."
 *     tags: [Board]
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
 *               boardId:
 *                 type: string
 *                 example: "48db-b9e3-9c9534a36398"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi boarddan muvaffaqiyatli o'chirildi"
 *       404:
 *         description: "Board topilmadi yoki foydalanuvchi topilmadi"
 *       400:
 *         description: "Foydalanuvchi boardda mavjud emas"
 *       500:
 *         description: "Server xatosi"
 */
