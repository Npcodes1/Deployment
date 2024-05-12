//require express and passport
const express = require("express");
const passport = require("passport");

//summon handler functions from authController
const { loginLocalFailed, logoutRequest, signupRequest } = require("../controllers/authController");

//define router
const router = express.Router();

//Create a POST to the path of /login/local, with passport authentication of the local route and providing a failureRedirect to /login/local/failed, as well as a callback that has a res.status.json where the status and statusCodes are 200, and the json object has a message that says "User logged in" and a data object to request the user's username, firstName and lastName.
router.post("/login/local", passport.authenticate("local", { failureRedirect: "/login/local/failed" }),
(req, res, next) => {
    res.status(200).json({ success: { message: "User logged in" }, data: {
                username: req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            },
            statusCode: 200
        });
    }
);

//Create a GET to the path of /login/local/failed with the handler function of loginLocalFailed
router.get("/login/local/failed", loginLocalFailed);

//Create a GET to the path of /logout with the handler function of logoutRequest
router.get("/logout", logoutRequest);

//Create a POST to the path of /signup with the handler function of signupRequest
router.post("/signup", signupRequest);

//GitHub Strategy

//GET to the path of /login/github and a second parameter that allows passport to authenticate a string of github
router.get("/login/github", passport.authenticate("github"));

//GET to the path of /login/github/failed with a callback that has a res.json where the message states that "There is a problem with Github Authentication".
router.get("/login/github/failed", (req, res, next) => {
    res.json({ message: "There is a problem with GitHub Authentication." });
});

//Lastly, GET to the path of /auth/github with passport authentication of the github route and providing a successRedirect to / AND a failureRedirect to /login/github/failed
router.get("/auth/github", passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login/github/failed"
}));

//Google Strategy

//GET to the path of /login/google with passport authentication of the google route and providing a scope object of an array with a string of profile.
router.get("/login/google", passport.authenticate("google", { scope: [ "profile" ] }));

//GET to the path of /login/google/failed with a callback that has a res.json where the message states that "There is a problem with Google Authentication".

router.get("/login/google/failed", (req, res, next) => {
    res.json({ message: "There is a problem with Google Authentication." });
});

//Lastly, GET to the path of /auth/google with passport authentication of the google route and providing a successRedirect to / AND a failureRedirect to /login/local/failed
router.get("/auth/google", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login/google/failed"
}));

//export router
module.exports = router;
