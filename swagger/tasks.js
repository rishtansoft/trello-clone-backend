/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: "Yangi task yaratish"
 *     description: "Foydalanuvchilar yangi task yaratishi mumkin."
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task title"
 *               description:
 *                 type: string
 *                 example: "Task description"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *               priority:
 *                 type: string
 *                 example: "Medium"
 *               dueDate:
 *                 type: string
 *                 example: "2023-12-31"
 *               boardId:
 *                 type: string
 *                 example: "48db-b9e3-9c9534a36398"
 *               assignedTo:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: "Task muvaffaqiyatli yaratildi"
 *       404:
 *         description: "Board yoki foydalanuvchi topilmadi"
 *       500:
 *         description: "Serverda xatolik yuz berdi"
 */

/**
 * @swagger
 * /api/tasks/assign:
 *   post:
 *     summary: "Taskga user tayinlash"
 *     description: "Foydalanuvchi taskga tayinlanadi"
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "48db-b9e3-9c9534a36398"
 *               userEmail:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi taskga tayinlandi"
 *       404:
 *         description: "Task yoki foydalanuvchi topilmadi"
 *       500:
 *         description: "Serverda xatolik yuz berdi"
 */


/**
 * @swagger
 * /api/tasks/{boardId}:
 *   get:
 *     summary: "Boardga tegishli barcha tasklarni olish"
 *     description: "Berilgan board IDga asoslangan holda tasklar ro'yxatini qaytaradi."
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: "Olingan tasklar uchun board ID"
 *         schema:
 *           type: string
 *           example: "48db-b9e3-9c9534a36398"
 *     responses:
 *       200:
 *         description: "Tasklar ro'yxati muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       priority:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: "Tasklar topilmadi"
 *       500:
 *         description: "Serverda xatolik yuz berdi"
 */
