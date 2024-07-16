const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: String,
  Description: String,
  postImage: {
    filename: String,
    mimeType: String 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("post", postSchema);
