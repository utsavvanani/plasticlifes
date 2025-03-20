const jwt = require('jsonwebtoken');

const authToken =  async(req, res, next) => {
  const token =  req?.cookies?.token
  // console.log("token-------------",token)
  if(!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first"
    })
  }

  const decoded = await jwt.verify(token, "siddh123");
  // console.log("decoded token",decoded)
  req.userId = decoded?._id;
  next()
};

module.exports = authToken;
