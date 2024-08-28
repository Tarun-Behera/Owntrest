const {localStorage,memoryStorage} = require("../config/multerConfig");
const { bucket } = require("../config/firebaseConfig");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

function uploadMiddleware(fieldname) {
  return (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      // Use Multer for development
      console.log("using local storage")
      localStorage.single(fieldname)(req, res, next);
    } else {
      // Use Firebase for production
      console.log("using firebase storage")
      memoryStorage.single(fieldname)(req, res, (err) => {
        if (err) return next(err);

        if (!req.file) return next();

        // Generate a unique filename for Firebase
        const uniqueFilename = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const blob = bucket.file(uniqueFilename);

        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        blobStream.on("error", (err) => {
          console.error("Error uploading file:", err);
          return res.status(500).json({ error: "Failed to upload image" });
        });

        blobStream.on("finish", async () => {
          // Generate the Firebase URL
          req.file.firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

          // Proceed to the next middleware or controller
          next();
        });

        // Pass the file buffer to Firebase
        blobStream.end(req.file.buffer);
      });
    }
  };
}

module.exports = uploadMiddleware;