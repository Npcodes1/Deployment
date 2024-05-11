//First, Require express and express.router()
const express = require("express");

//summoning handler functions from bookController
const { getAllBooks, getBook, createBook, editBook, deleteBook } = require("../controllers/bookController");

//define router
const router = express.Router();

// This will send all of the book data
router.get("/", getAllBooks);

// This will send all of the books details data, or each book by their ID
router.get("/:id", getBook);

//This will send all of the data that will have the ability to create new books
router.post("/create/new", createBook);

//This will send all of the update comic book form page data to modify a book by their ID
router.put("/edit/:id", editBook);

//This will send all of the data that will have the ability to delete a book by their ID
router.delete("/delete/:id", deleteBook);

module.exports = router;