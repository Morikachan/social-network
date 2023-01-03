const UserService = require("../services/userService");
const UserDTO = require('../dtos/userDTO')
const Post = require('../models/postModel')

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
  res.json({user: new UserDTO(req.user)})
};

const getPosts = async (req, res) => {
  const posts = await Post.find({author: req.user._id}).sort({'createdAt': -1}).populate('author', 'login email')
  res.json({posts})
}

const createPost = async (req, res) => {
  const {text} = req.body

  const newPost = await new Post({text, author: req.user._id}).save()
  await newPost.populate('author', 'login email')
  res.json({newPost})
}

module.exports = { userLogin, userSignUp, accountVerify, checkAuth, createPost, getPosts };
