require("dotenv").config();

const express = require("express");
const booksRouter = require("../routes/book");
const app = express();
const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello Books World!");
});
app.use("/books", booksRouter);

app.listen(port, () => {
  console.log(
    `Listening on port :${port} at localhost (http://localhost:${port})`,
  );
});
