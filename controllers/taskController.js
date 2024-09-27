// controllers/taskController.js
const { Task, Board, User } = require('../models');

exports.createTask = async (req, res) => {
    const { title, description, status, priority, dueDate, boardId, assignedTo } = req.body;

    try {
        // Board mavjudligini tekshirish
        const board = await Board.findByPk(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board topilmadi' });
        }

        // Agar assignedTo ko'rsatilgan bo'lsa, foydalanuvchini tekshirish
        let assignee = null;
        if (assignedTo) {
            assignee = await User.findOne({ where: { email: assignedTo } });
            if (!assignee) {
                return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
            }
        }

        // Task yaratish
        const task = await Task.create({
            title,
            description,
            status: status || 'Pending',
            priority: priority || 'Medium',
            dueDate,
            boardId,
            assignedTo: assignee ? assignee.id : null,
        });

        return res.status(201).json({ message: 'Task muvaffaqiyatli yaratildi', task });
    } catch (error) {
        return res.status(500).json({ message: 'Serverda xatolik yuz berdi', error });
    }
};

// Taskga user tayinlash
exports.assignUserToTask = async (req, res) => {
    const { taskId, userEmail } = req.body;

    try {
        // Task mavjudligini tekshirish
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task topilmadi' });
        }

        // User emaili orqali userni topish
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        // Userni taskga tayinlash
        task.assignedTo = user.id;
        await task.save();

        return res.status(200).json({ message: `Foydalanuvchi ${userEmail} taskga tayinlandi`, task });
    } catch (error) {
        return res.status(500).json({ message: 'Serverda xatolik yuz berdi', error });
    }
};

exports.getTasksByBoardId = async (req, res) => {
    const { boardId } = req.params;

    try {
        // Boardga tegishli tasklarni olish
        const tasks = await Task.findAll({ where: { boardId } });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Ushbu boardga tegishli tasklar topilmadi' });
        }

        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Serverda xatolik yuz berdi', error });
    }
};