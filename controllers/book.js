const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Database/books.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

exports.getAllBooks = (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
};

exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  db.get("SELECT * FROM books WHERE id = ?", [bookId], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    } else {
      if (!row) {
        return res.status(404).send("Book not found");
      } else {
        res.json(row);
      }
    }
  });
};

exports.createBook = (req, res) => {
  const book = req.body;
  db.run(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [book.title, book.author],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).json({ id: this.lastID, title: book.title, author: book.author });
    }
  );
};

exports.updateBook = (req, res) => {
  const book = req.body;
  db.run(
    "UPDATE books SET title = ?, author = ? WHERE id = ?",
    [book.title, book.author, parseInt(req.params.id)],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        res.status(200).send(book);
      }
    }
  );
};

exports.deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  db.run("DELETE FROM books WHERE id = ?", [bookId], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    } else {
      res.status(204).send();
    }
  });
};
