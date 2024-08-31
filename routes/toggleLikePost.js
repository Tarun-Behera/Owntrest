const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const postModel = require('../models/post');
const isLoggedIn = require('../middlewares/auth')

router.post("/toggle-like-post/:postId", isLoggedIn, async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.session.passport.user });
      const post = await postModel.findById(req.params.postId);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const likedIndex = user.likedPosts.indexOf(post._id);
  
      if (likedIndex === -1) {
        // Post is not in likedPosts, so add it
        user.likedPosts.push(post._id);
        await user.save();
        return res.status(200).json({ message: "Post liked", liked: true });
      } else {
        // Post is already in likedPosts, so remove it
        user.likedPosts.splice(likedIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Post unliked", liked: false });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
