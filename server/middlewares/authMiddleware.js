const TokenService = require("../services/tokenService");

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ message: "invalid request" }); // 401 bad request
  }
  // 'Bearer afsgdfhskfsadfsgfdjafj'
  const token = tokenHeader.split(" ")[1];

  const user = TokenService.verify(token);
  if (!user) {
    return res.status(403).json({ message: "please, relogin" }); // 403 forbidden
  }

  req.user = user;

  next();
};
