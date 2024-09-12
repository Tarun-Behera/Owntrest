var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("../../models/user.js");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication.' });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log in user.' });
            }
            return res.status(200).json({ success: true, message: "Login Successful." });
        });
    })(req, res, next);
});

module.exports = router;
