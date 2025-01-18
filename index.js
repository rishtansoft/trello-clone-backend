// Import necessary modules
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
// Initialize Express app
const app = express();
const PORT = 5050;

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// Initialize Sequelize
const sequelize = new Sequelize('postgres://crm:crm2024@localhost:5432/bookstore', {
  dialect: 'postgres',
});

// Define Book model
const Book = sequelize.define('Book', {
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

// Sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ force: false }); // Avoid resetting the DB
    console.log('Models synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


// API Endpoints

// 1. Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

// 2. Update a book
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error });
  }
});

// 3. Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
});

// 4. Add a new book
app.post('/books', async (req, res) => {
    const { title, author, year } = req.body;
  
    try {
      const newBook = await Book.create({ title, author, year });
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add book', error });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
