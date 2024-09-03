
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/auth");
const userModel = require("../../models/user");

// Middleware to select storage method based on environment
const prfImgMiddleware = require("../../middlewares/prfImgMiddleware")


/* POST for profile-image updation */
router.post("/profile-image", isLoggedIn, prfImgMiddleware("prf-img"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please select a file to upload" });
    }

    let imageUrl;
    if (process.env.NODE_ENV === "development") {
      // Local storage file path
      imageUrl = `/profile-img/${req.file.filename}`;
    } else {
      // Firebase Cloud Storage URL
      imageUrl = req.file.firebaseUrl;
    }

    const user = await userModel.findOne({ username: req.session.passport.user });
    if (!user) {
      throw new Error("User not found");
    }

    user.profileImg = imageUrl;  // Save the URL to the database
    await user.save();

    return res.status(200).json({ profileImage: imageUrl });
  } catch (error) {
    // console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
