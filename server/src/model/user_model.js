const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique:false
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role:{
    type:String
  },
  googleId: String,
  // passport use 
  accessToken: { type: String },   // Store Access Token
  refreshToken: { type: String } ,  // Store Refresh Token

  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
},{
  timestamps: true
});


const user = mongoose.model('user', userSchema);

module.exports = user;
