//require passport and bcrypt
const passport = require("passport");
const bcrypt = require("bcrypt");

//define local strategy
const LocalStrategy = require("passport-local").Strategy;

//define github strategy
const GithubStrategy = require("passport-github").Strategy;

//define google strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//require user model
const User = require("../models/userModel");

//implement local strategy
passport.use(
    new LocalStrategy(function verify(username, password, done) {
        User.findOne({username: username})
        .then((user) => {
            //if no user
            if (!user) {
                return done(null, false, { message: "User not found." });
            }
            //compare username and password and show if it matches
            bcrypt.compare(password, user.password, (error, result) => {
                console.log("result", result);
                //to catch errors- if error, show error
                if(error) {
                    return done(error);
                }
                // else if no error, show user
                return done(null, user);
            });
        })
        //to handle errors
        .catch((error) => {
            console.log(`There was an error finding user from database: ${error}`);
        });
    })
);

//implement github strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://deployment-l9cr.onrender.com/auth/github"
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    })
);

//implement google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://deployment-l9cr.onrender.com/auth/google",
    scope: ["profile", "email"],
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    })
);

//implement serializeUser/deserializeUser functions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

