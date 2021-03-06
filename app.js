const express = require("express");
const logger = require("morgan");
const cors = require('cors')

const index = require("./routes/index");
const books = require("./routes/books.js");
const authors = require("./routes/authors.js");

const setCors = () => {
    if (process.env.NODE_ENV === "production"){
       return cors({origin: process.env.ALLOWED_ORIGIN})
    }  return cors()
}

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(setCors())

app.use("/", index);
app.use("/books", books);
app.use("/authors", authors);

module.exports = app;
