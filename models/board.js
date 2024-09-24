const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Board = sequelize.define('Board', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    backgroundImage: {
      type: DataTypes.STRING, // background image URL
      allowNull: true,
    }
  });

  // Associations
  Board.associate = (models) => {
    Board.belongsToMany(models.User, {
      through: 'BoardUsers', // middle table for many-to-many relationship
      as: 'users',
      foreignKey: 'boardId',
    });

    Board.hasMany(models.Task, {
      foreignKey: 'boardId',
      as: 'tasks',
      onDelete: 'CASCADE',
    });
  };

  return Board;
};
