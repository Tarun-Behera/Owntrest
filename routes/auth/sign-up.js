var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("../../models/user.js");

// Helper function to check if a user exists
async function checkIfUserExists(username, email) {
  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });
  if (user) {
    return { username: user.username, email: user.email };
  } else {
    // console.error("no user found");
  }
}
  
router.post("/sign-up", async (req, res, next) => {
  const { username, fullname, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    // console.error("Fill all data");
    return res.status(400).json({ message: "Fill all data" });
  }

  try {
    const userExists = await checkIfUserExists(username, email);
    if (userExists) {
      if (userExists.username === username) {
        // console.error("Username exists");
        return res.status(400).json({ message: "Username exists" });
      } else if (userExists.email === email) {
        // console.error("Email exists");
        return res.status(400).json({ message: "Email exists" });
      }
    }

    userModel.register(new userModel({ username, fullname, email }), password, (err) => {
      if (err) {
        // console.error(err.message);
        return res.status(400).json({ message: "User registration failed" });
      }
      passport.authenticate("local")(req, res, () => {
        // console.log("User authenticated successfully");
        return res.status(200).json({ success: true, message: "Account Created Successfully !!!" });
      });
    });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
