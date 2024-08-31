var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  fullname:{
    type:String,
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
  },
  profileImg:String,
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  }],
  likedPosts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  }],
})
userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema)