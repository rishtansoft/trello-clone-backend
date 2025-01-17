const { Sequelize, DataTypes } = require('sequelize');
const { faker } = require('@faker-js/faker');

// Initialize Sequelize
const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/bookstore', {
  dialect: 'postgres',
});

// Define Book model
const Book = sequelize.define('Books', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Seed fake data
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    await sequelize.sync({ force: true }); // Drops and recreates tables

    const books = Array.from({ length: 100 }, () => ({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      year: faker.number.int({ min: 1900, max: 2023 }),
    }));

    await Book.bulkCreate(books);
    console.log('100 fake books have been added to the database!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
})();
