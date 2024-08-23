var express = require("express");
var router = express.Router();
var isLoggedIn = require("../middlewares/auth");
var userModel = require("../models/user");
var postModel = require("../models/post");
var prfImg = require("./multer/prf-img");
var posts = require("./multer/posts");

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
    console.error("Error:", error);
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
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/* GET profile page */
router.get("/profile", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
    return res.render("profile", { user, home: false, profile: false, logout: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// # Handling the POST request

/* POST for profile-image updation */
router.post("/profile-image", isLoggedIn, prfImg.single("prf-img"), async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    user.profileImg = req.file.filename;
    await user.save();
    return res.status(200).json({ profileImage: req.file.filename });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/* POST for post upload */
router.post("/create-post", isLoggedIn, posts.single("postImage"), async (req, res, next) => {
  try {
    // Validate required fields
    if (!req.file) {
      console.error("please select a file");
      return res.status(400).json({ error: "Please select a file to upload" });
    }
    ///
    const user = await userModel.findOne({ username: req.session.passport.user });
    const post = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      postImage: {
        filename: req.file.filename,
        mimeType: req.file.mimetype,
      },
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    return res.status(200).json({ posts: post, user: user });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error"  });
  }
});

//# Handling the DELETE request
/* DELETE Posts */
router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
