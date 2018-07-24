const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const mongoose = require("mongoose");

const addTryCatchBlock = (asyncExpressFunction) => {
  return async (req, res, next) => {
    try {
      await asyncExpressFunction(req, res, next)
    } catch (error) {
      next(error)
    }
  }
 }

/* GET books listing. */
router.get("/", addTryCatchBlock( async (req, res, next) => {
    const books = await Book.find().populate("author");
    res.json(books);
}));

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });

    await newBook.save();

    res.status(201).json({ message: `created a new book successfully` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
