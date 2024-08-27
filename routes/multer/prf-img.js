const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../../config/serviceAccount.json');

if (!admin.apps.length) {
  const serviceAccount = {
    type: process.env.FIREBASE_PROJECT_ID ? 'service_account' : '',
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

const bucket = admin.storage().bucket();
const storage = multer.memoryStorage();  
const prfImg = multer({ storage: storage });
const router = express.Router();
const isLoggedIn = require("../../middlewares/auth");
const userModel = require("../../models/user");

/* POST for profile-image updation */
router.post("/profile-image", isLoggedIn, prfImg.single("prf-img"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please select a file to upload" });
    }

    const uniqueFilename = uuidv4() + path.extname(req.file.originalname);
    const blob = bucket.file(`profile-images/${uniqueFilename}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error("Error uploading to Firebase:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    });

    blobStream.on('finish', async () => {
      // The file is successfully uploaded, now save the URL to the database
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

      const user = await userModel.findOne({ username: req.session.passport.user });
      user.profileImg = publicUrl;  // Store the public URL instead of the filename
      await user.save();

      return res.status(200).json({ profileImage: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
