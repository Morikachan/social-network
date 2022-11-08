const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const TokenService = require("./tokenService");
const MailService = require("./mailService");
const UserDTO = require("../dtos/userDTO");
const uuid = require("uuid");

const saltRounds = 10;

class UserService {
  async sighUp(login, email, password) {
    const loginCheck = await User.findOne({ $or: [{ email }, { login }] });
    if (loginCheck) {
      console.log(loginCheck);
      return false;
    }
    const hasedPassword = await bcrypt.hash(password, saltRounds);
    const activationSecret = uuid.v4();

    const newUser = await new User({
      login,
      email,
      password: hasedPassword,
      activationSecret,
    }).save();

    const user = new UserDTO(newUser);
    const token = TokenService.generate(user);

    const link = `http://localhost:5001/api/users/accountVerify?secret=${activationSecret}`;
    await MailService.sendMail(
      email,
      "Account confirmation",
      `To verify your account, please follow this <a href="${link}">link</a>`
    );

    return { user, token };
  }

  async accountVerify(secret) {
    const foundUser = await User.findOne({ activationSecret: secret });
    if (!foundUser) {
      return false;
    }
    console.log(secret);
    console.log(foundUser);
    foundUser.isVerified = true;
    await foundUser.save();
    return true;
  }
}

module.exports = new UserService();
