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
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.ENUM('orange', 'gray', 'green', 'red'), // Faqat ushbu ranglar
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID, // Bog'langan user ID
            allowNull: false
        }
    });

    return Board;
};
