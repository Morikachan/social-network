const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const TokenService = require("./tokenService");
const MailService = require("./mailService");
const UserDTO = require("../dtos/userDTO");
const uuid = require("uuid");
const APIError = require("../exceptions/APIError");

const saltRounds = 10;

class UserService {
  async sighUp(login, email, password) {
    const loginCheck = await User.findOne({ $or: [{ email }, { login }] });
    if (loginCheck) {
      console.log(loginCheck);
      throw APIError.BadRequest(
        "User with this email or login is already exists"
      );
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

  async login(loginOrEmail, password) {
    const candidate = await User.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
    if (!candidate) {
      throw APIError.BadRequest("User with this email or login not found");
    }
    const isPassValid = await bcrypt.compare(password, candidate.password);
    if (!isPassValid) {
      throw APIError.BadRequest("Password is invalid");
    }

    const user = new UserDTO(candidate);
    const token = TokenService.generate(user);

    return { user, token };
  }
}

module.exports = new UserService();
