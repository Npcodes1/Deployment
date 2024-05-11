// const booksData = require("../data/data");

//summoning the Book model
const Book = require("../models/bookModel");

//get all Books
const getAllBooks = async (req, res, next) => {
    try {
        await Book.find({})
        .then(books =>
        res.status(200).json({ success: { message: "Found all books!" }, data: books, statusCode: 200 }));

    } catch (error) {
        res.status(400).json({ error: { message: "Something went wrong getting all the books!" }, statusCode: 400 });
    }
};

//get one Book
const getBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Book.findOne({ _id: id })
        .then(foundBook =>
        res.status(200).json({ success: { message: "Found the book you are looking for!" }, data: foundBook, statusCode: 200 }));

    } catch (error) {
        res.status(400).json({ error: { message: "Something went wrong retrieving a book!" }, statusCode: 400 });
    }
};

//create Book
const createBook = async (req, res, next) => {
    const { title, author, publisher, genre, pages, rating, synopsis } = req.body;

    const newBook = new Book({
        title,
        author,
        publisher,
        genre,
        pages,
        rating,
        synopsis
    });

    try {
        await newBook.save();
        res.status(201).json({ success: { message: "A new book is created" }, data: newBook, statusCode: 201 });

    } catch (error) {
        res.status(400).json({ error: { message: "Something went wrong creating a book!" }, statusCode: 400 });
    }
};

//edit Book
const editBook = async (req, res, next) => {
    const { id } = req.params;

    const { title, author, publisher, genre, pages, rating, synopsis } = req.body;

    try {
        await Book.findByIdAndUpdate(id, {
            $set: {
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis
            }
        }, { new: true });
        res.status(201).json({ success: { message: "Book is updated" }, data: newBook, statusCode: 201 });

    } catch (error) {
        res.status(400).json({ error: { message: "Something went wrong while editing the book" }, statusCode: 400 });
    }
};

//delete Book
const deleteBook = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ success: { message: "Book deleted successfully!" }, statusCode: 200 });

    } catch (error) {
        res.status(400).json({ error: { message: "Something went wrong while deleting the book!" }, statusCode: 400 });
    }
};

//Exporting the controllers to be used everywhere w/in the app
module.exports = { getAllBooks, getBook, createBook, editBook, deleteBook };