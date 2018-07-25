const express = require("express");
const logger = require("morgan");
const cors = require('cors')

const index = require("./routes/index");
const books = require("./routes/books.js");
const authors = require("./routes/authors.js");

var whitelist = ['http://localhost:3000/', 'http://example2.com']
var corsOptions = {
    origin: whitelist
}

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions))

app.use("/", index);
app.use("/books", books);
app.use("/authors", authors);

module.exports = app;
