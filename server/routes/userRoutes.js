const {
  userLogin,
  userSignUp,
  accountVerify,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.get("/accountVerify", accountVerify);

module.exports = router;
