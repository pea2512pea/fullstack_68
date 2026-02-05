const bookControllers = require('../controllers/book');

const express = require('express');
const app = express();

app.use(express.json());
app.get("/", bookControllers.getAllBooks);
app.get("/:id", bookControllers.getBookById);
app.post("/", bookControllers.createBook);
app.put("/:id", bookControllers.updateBook);
app.delete("/:id", bookControllers.deleteBook);

module.exports = app;