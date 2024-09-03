
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/auth");
const userModel = require("../../models/user");
const postModel = require("../../models/post");

// Middleware to select storage method based on environment
const postUploadMiddleware = require("../../middlewares/postUploadMiddleware")

/* POST for post upload */
router.post("/create-post", isLoggedIn, postUploadMiddleware("postImage"), async (req, res) => {
  try {
    // Validate required fields
    if (!req.file) {
      // console.error("please select a file");
      return res.status(400).json({ error: "Please select a file to upload" });
    }

    const fileData = process.env.NODE_ENV === "development" 
    ? { filename: req.file.filename, mimeType: req.file.mimetype, url: `/posts-img/${req.file.filename}` }
    : { filename: req.file.firebaseUrl, mimeType: req.file.mimetype, url: req.file.firebaseUrl };

    const user = await userModel.findOne({ username: req.session.passport.user });
    if (!user) {
      throw new Error("User not found");
    }

    const post = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      postImage: fileData,
      user: user._id,
    });

    user.posts.push(post._id);
    await user.save();
    res.status(200).json({ posts: post, user: user });
  } catch (error) {
    // console.error("Error creating post:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
