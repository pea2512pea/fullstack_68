require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello Books World!");
});

app.listen(port, () => {
  console.log(
    `Listening on port :${port} at localhost (http://localhost:${port})`,
  );
});
