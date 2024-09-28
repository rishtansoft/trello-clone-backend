// controllers/commentController.js
const { Task, Comment } = require('../models');

// Taskga izoh yozish uchun API
exports.addComment = async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;

  try {
    // Taskni topish
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task topilmadi' });
    }

    // Yangi izoh yaratish
    const comment = await Comment.create({
      taskId: task.id,
      text,
    });

    return res.status(201).json({ message: 'Izoh qo\'shildi', comment });
  } catch (error) {
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi', error });
  }
};
