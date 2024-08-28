const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
// Set up Multer storage for local file system (for development)
// Storage configuration for Multer
const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = "uploads/";
      if (file.fieldname === "postImage") {
        uploadPath += "posts-img";
      } else if (file.fieldname === "prf-img") {
        uploadPath += "profile-img";
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`);
    }
  });
  
  const memoryStorage = multer.memoryStorage();

  const getMulter = (storage) => multer({ storage });
  
  // Export different storage configurations
  module.exports = {
    localStorage: getMulter(localStorage),
    memoryStorage: getMulter(memoryStorage)
  };
