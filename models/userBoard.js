// models/userBoard.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserBoard = sequelize.define('UserBoard', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  return UserBoard;
};
