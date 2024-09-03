var express = require("express");
var router = express.Router();
var isLoggedIn = require("../middlewares/auth");
var userModel = require("../models/user");
var postModel = require("../models/post");

//# Handling the GET request */

/* GET auth page. */
router.get("/", function (req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    } else {
      return res.render("index");
    }
  } catch (error) {
    // console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/* GET Home page. */
router.get("/home", isLoggedIn, async function (req, res) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    const posts = await postModel.find().populate("user").sort({ _id: -1 });
    return res.render("home", { user, posts, home: true, profile: true, logout: true });
  } catch (error) {
    // console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/* GET profile page */
router.get("/profile", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
    return res.render("profile", { user, home: false, profile: false, logout: true });
  } catch (error) {
    // console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});


//# Handling the DELETE request
/* DELETE Posts */
router.delete("/posts/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
