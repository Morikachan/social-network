const {
  userLogin,
  userSignUp,
  accountVerify,
  checkAuth,
  createPost,
  getPosts,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.get("/accountVerify", accountVerify);

router.get("/checkAuth", authMiddleware, checkAuth);

router.get("/getPosts", authMiddleware, getPosts);

router.post("/createPost", authMiddleware, createPost);


module.exports = router;
