const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/prf-img");
  },
  filename: (req, file, cb) => {
    const unique = uuidv4();
    if (typeof unique == 'string') {
      console.log(`file:${file}`);
      cb(null, unique+path.extname(file.originalname));
    }
    else{
      console.log('not string -',typeof(unique),'-',unique);
    }
  },
});

const prfImg = multer({ storage: storage });
module.exports = prfImg;
