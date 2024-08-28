// uploadMiddleware.js
const { localStorage, memoryStorage } = require('../config/multerConfig');
const { bucket } = require('../config/firebaseConfig');
const uuidv4 = require('uuid').v4;
const path = require('path');

// Middleware to select storage based on environment
function prfImgMiddleware(fieldname) {
  return (req, res, next) => {
    const multerUpload = process.env.NODE_ENV === 'development' ? localStorage.single(fieldname) : memoryStorage.single(fieldname);

    multerUpload(req, res, (err) => {
      if (err) return next(err);

      if (process.env.NODE_ENV !== 'development' && req.file) {
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

        blobStream.on('finish', () => {
          req.file.firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
          next();
        });

        blobStream.end(req.file.buffer);
      } else {
        next();
      }
    });
  };
}

module.exports = prfImgMiddleware;
