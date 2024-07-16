const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/posts");
  },
  filename: (req, file, cb) => {
    const unique = uuidv4();
    cb(null, unique + path.extname(file.originalname));
  },
});
const posts = multer({ storage: storage });
module.exports = posts;
