const TokenService = require("../services/tokenService");
const User = require('../models/userModel')

module.exports = async (req, res, next) => {
  const tokenHeader = req.headers?.authorization;
  // req.headers?.authorization - explain

  if (!tokenHeader) {
    return res.status(401).json({ message: "invalid request" }); // 401 bad request
  }
  // 'Bearer afsgdfhskfsadfsgfdjafj'
  const token = tokenHeader.split(" ")[1];

  const userInfo = TokenService.verify(token); // userDTO
  if (!userInfo) {
    return res.status(403).json({ message: "please, relogin" }); // 403 forbidden
  }

  const user = await User.findById(userInfo.id) // to get fresh info



  req.user = user;

  next();
};
