// models/board.js
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.ENUM('orange', 'gray', 'green', 'red'), // Faqat ushbu ranglar
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Board.associate = (models) => {
    Board.belongsToMany(models.User, { through: 'UserBoards' }); // Ko'p-to-kop aloqani o'rnatish
  };

  return Board;
};
