const UserService = require("../services/userService");

const userLogin = async (req, res) => {
  const { loginOrEmail, password } = req.body;

  try {
    const result = await UserService.login(loginOrEmail, password);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const userSignUp = async (req, res) => {
  const { login, email, password } = req.body;

  try {
    const result = await UserService.sighUp(login, email, password);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const accountVerify = async (req, res) => {
  const { secret } = req.query;

  const result = await UserService.accountVerify(secret);

  if (result) {
    res.end("User was successfuly confirmed, you can go to your account");
  } else {
    res.end("Problems :(");
  }
};

const checkAuth = (req, res) => {
  console.log(req.user);
};

module.exports = { userLogin, userSignUp, accountVerify, checkAuth };
