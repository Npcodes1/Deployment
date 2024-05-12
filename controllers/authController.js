//require bcrypt and passport
const bcrypt = require("bcrypt");

//import User model
const User = require("../models/userModel");

//loginLocalFailed
const loginLocalFailed = (req, res, next) => {
    res.status(401).json({ error: { message: "Username or password is incorrect." }, statusCode: 401 });
};

//logoutRequest
const logoutRequest = (req, res, next) => {
    req.logout((error) => {
        //if there's an error, show the error
        if(error) {
            res.status(400).json({ error: { message: "Something went wrong!" }, statusCode: 400 })
        } //otherwise if there's no error, show user successfully logged out
        res.status(200).json({ success: { message: "User logged out!" }, statusCode: 200 });
        
    });
};

//signupRequest
const signupRequest = (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    bcrypt.hash(password, 10, (error, hashedPassword) => {
        //return next error
        if(error) {
            return next(error);
        }

        //create new user using the User model
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword
        });

        try {
            newUser.save();
            req.login(newUser, (err) => {
                //check for errors before creating new user
                if(err) {
                    res.status(400).json({ error: { message: "Something went wrong while signing up!" }, statusCode: 400 });
                } 
            }) //if no errors, then create new user using the data from User (minus password)
            res.status(201).json({ success: {message: "New user is created"}, data: { firstName, lastName, username }, statusCode: 201});

        //check for errors again after creating user
        } catch (error) {
            //if there's a duplicate username
            if(error.code === 11000, error.keyPattern.username) {
                res.status(400).json({ error: { message: "Username already exists" }, statusCode: 400});
            } //else there's a problem with the server and the request can't be made
            res.status(500).json({ error: { message: "Internal server error" }, statusCode: 500});
        }
    });
};

module.exports = { loginLocalFailed, logoutRequest, signupRequest };