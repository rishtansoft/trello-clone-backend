const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Doing', 'Testing', 'Done'),
      defaultValue: 'Pending',
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium',
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });

  // Associations
  Task.associate = (models) => {
    Task.belongsTo(models.Board, {
      foreignKey: 'boardId',
      as: 'board',
      onDelete: 'CASCADE',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee',
    });

    Task.hasMany(models.Comment, {
      foreignKey: 'taskId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };

  return Task;
};
