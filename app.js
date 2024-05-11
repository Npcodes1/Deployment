//lets the app know to look for the dotenv node modules folder, find the config file, and run the method. Allows us to load environmental variables from .env file
require("dotenv").config(); 

//to use the connection file
require("./config/connection");

//require authStrategy- needed to add authentication
require("./config/authStrategy");

//Middleware- express and morgan
const express = require("express");
const morgan = require ("morgan");

//imports path module - gives the capability to create a path.
const path = require("node:path"); 

//require cors
const cors = require("cors");

//require helmet
const helmet = require("helmet");

//require passport to use express-session and keep track of user's state.
const passport = require("passport");

//require express-session to create unique stored sessions per user
const session = require("express-session");

//Create a const variable called app with the value of express()
const app = express();

//Create a const variable called PORT with the value of 3000
const PORT = process.env.PORT || 3000;

//define routing variables to create a path to bookRoutes and authRoutes
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

// Use middleware
//use helmet- sets http response headers
app.use(helmet({ contentSecurityPolicy: false }));

//Use morgan as a middleware for this project
app.use(morgan("dev"));

// use cors- only allows certain servers inside access(VIP bouncer)
app.use(cors()); 

// JSON
app.use(express.json());

//helps parse form data
app.use(express.urlencoded({extended: true}));

//to provide path to public directory
app.use(express.static(path.join(__dirname + "/public"))); 

//use session
app.use(
    session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
})
);

//initialize passport
app.use(passport.initialize());

//lets passport use session
app.use(passport.session());

//Routing Paths
//use the route path for bookRoutes and authRoutes
app.use("/api/books", bookRoutes); 
app.use("/", authRoutes);

// GET routes to other pages- will remove later
//points to the Home page
app.get("/", (req, res, next) => {
    res.status(200).json({success: {message: "Index successful"}, statusCode: 200});
});

//points to the About page"
app.get("/about", (req, res, next) => {
    res.status(200).json({success: {message: "This route points to the About page"}, statusCode: 200});
});

//points to the Login page"
app.get("/login", (req, res, next) => {
    res.status(200).json({success: {message: "This route points to the Login page"}, statusCode: 200});
});

//points to the Admin Console page"
app.get("/admin", (req, res, next) => {
    res.status(200).json({success: {message: "This route points to the Admin Console page"}, statusCode: 200});
});

//points to the Create Book page"
app.get("/admin/create-book", (req, res, next) => {
    res.status(200).json({success: {message: "This route points to the Create Book page"}, statusCode: 200});
});

//Server
app.listen(PORT, () => {
console.log(`The server is listening on port ${PORT}`);
console.log(`http://localhost:${PORT}`);
});
