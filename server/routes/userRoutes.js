const {
  userLogin,
  userSignUp,
  accountVerify,
  checkAuth,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.get("/accountVerify", accountVerify);

router.post("/checkAuth", authMiddleware, checkAuth);

module.exports = router;
