/**
 * @swagger
 * /api/tasks/{taskId}/comments:
 *   post:
 *     summary: "Taskga izoh qo'shish"
 *     description: "Berilgan task ID bo'yicha yangi izoh qo'shish."
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: "Izoh qo'shiladigan task ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Bu yangi izoh matni."
 *     responses:
 *       201:
 *         description: "Izoh muvaffaqiyatli qo'shildi"
 *       404:
 *         description: "Task topilmadi"
 *       500:
 *         description: "Serverda xatolik yuz berdi"
 */
