const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const express = require("express");
var router = express.Router();
var isLoggedIn = require("../../middlewares/auth");
var userModel = require("../../models/user");
var postModel = require("../../models/post");

const admin = require("firebase-admin");  // <-- New line

// Initialize Firebase
if (!admin.apps.length) {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
} else {
  admin.app(); // Use the already initialized app
}

const bucket = admin.storage().bucket();  // <-- New line

const storage = multer.memoryStorage();  // <-- Changed line

const posts = multer({ storage: storage });

/* POST for post upload */
router.post("/create-post", isLoggedIn, posts.single("postImage"), async (req, res, next) => {
  try {
    // Validate required fields
    if (!req.file) {
      console.error("please select a file");
      return res.status(400).json({ error: "Please select a file to upload" });
    }

    // Upload file to Firebase Storage
    const blob = bucket.file(`${uuidv4()}${path.extname(req.file.originalname)}`);  // <-- New line
    const blobStream = blob.createWriteStream({  // <-- New line
      metadata: {  // <-- New line
        contentType: req.file.mimetype,  // <-- New line
      },  // <-- New line
    });  // <-- New line

    blobStream.on('error', (err) => {  // <-- New line
      console.error("Error uploading file:", err);  // <-- New line
      return res.status(500).json({ error: err.message || "Internal Server Error" });  // <-- New line
    });  // <-- New line

    blobStream.on('finish', async () => {  // <-- New line
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;  // <-- New line

      const user = await userModel.findOne({ username: req.session.passport.user });
      const post = await postModel.create({
        title: req.body.title,
        description: req.body.description,
        postImage: {
          filename: blob.name,  // <-- Changed line
          mimeType: req.file.mimetype,
          url: publicUrl,  // <-- New line
        },
        user: user._id,
      });
      user.posts.push(post._id);
      await user.save();
      return res.status(200).json({ posts: post, user: user });
    });  // <-- New line

    blobStream.end(req.file.buffer);  // <-- New line

  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error"  });
  }
});

module.exports = posts;
module.exports = router;
