const books = require("../dummy/CRUDBookNoDB");

exports.getAllBooks = (req, res) => {
  res.json(books);
};
exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
};
exports.createBook = (req, res) => {
    if (books.find(b => b.title === req.body.title)) {
        return  res.status(400).send("Book already exists");
    }
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.send(book);
};
exports.updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).send("Book not found");
  book.title = req.body.title;
  book.author = req.body.author;
  res.send(book);
};
exports.deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);

    const find_book = books.find(b => b.id === bookId);
    console.log(find_book);
    if(!find_book) {
        console.log("Book not found");
    }
    

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) return res.status(404).send("Book not found");
  const deletedBook = books.splice(bookIndex, 1);
  res.send(deletedBook);
};
