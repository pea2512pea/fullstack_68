const express = require('express');
// dotenv
require('dotenv').config();
const sequelize = require('sequelize');

const app = express();
app.use(express.json());


const seq = new sequelize.Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database/SQBooks.sqlite'
});

// book has id title author
const Book = seq.define('Book', {
    id: {
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

seq.sync();

app.get('/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', async (req, res) => {
    const { title, author } = req.body;
    const newBook = await Book.create({ title, author });
    res.status(201).json(newBook);
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = await Book.findByPk(id);
    if (book) {
        book.title = title;
        book.author = author;
        await book.save();
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
        await book.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});