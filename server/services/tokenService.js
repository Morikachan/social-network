const jwt = require("jsonwebtoken");

class TokenService {
  generate(payload) {
    return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
  }

  verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return false;
    }
  }
}

module.exports = new TokenService();
