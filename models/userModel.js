//require Mongoose
const mongoose = require("mongoose");
const passport = require("passport");

//Create a new variable called userSchema. As a value, make a new Schema. To do this, use the new keyword and have mongoose connect to the Schema() method using dot notation
    //The schema should include the following keys:
        //firstName
        //lastName
        //username
        //password
        //salt
        //strategy

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: Buffer
    },

    salt: {
        type: Buffer
    },
    
    strategy: {
        type: String,
        required: true
    }
});

//to create a variable called ‘User’ to use the collection name Schema as the model/blueprint
const User = mongoose.model("User", userSchema);

//Make sure to export User so that it can be used around the application itself
module.exports = User;