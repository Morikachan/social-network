const UserService = require("../services/userService");

const userLogin = (req, res) => {
  res.json({ status: 200 });
};

const userSignUp = async (req, res) => {
  const { login, email, password } = req.body;

  const result = await UserService.sighUp(login, email, password);
  console.log(result);
  res.json(result);
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

module.exports = { userLogin, userSignUp, accountVerify };
