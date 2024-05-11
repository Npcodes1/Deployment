//require Mongoose
const mongoose = require("mongoose");

//Create a new variable called bookSchema. As a value, make a new Schema. To do this, use the new keyword and have mongoose connect to the Schema() method using dot notation.
 //The schema should include the following keys:
    //title
    //author
    //publisher
    //genre
    // pages - please use the type of Number here
    //rating - please use the type of Number here
    //synopsis
    //image

const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },

    author: {
        type: String
    },

    publisher: {
        type: String
    },

    genre: {
        type: String
    },

    pages: {
        type: Number
    },

    rating: {
        type: Number
    },

    synopsis: {
        type: String
    },

    image: {
        type: String
    }
});

//Create a new variable called Book that has the Mongoose model as the value. The model should be able to create a collection called ‘Book’ and also use the bookSchema for the collection structure
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
