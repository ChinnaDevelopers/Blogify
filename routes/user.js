const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signup, signin, verify, getProfile } = require("../controllers/user");
const { isLoggedIn } = require("../utils/isLoggedIn");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify/:token", verify);
router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.use(isLoggedIn);
router.get("/profile", getProfile);

module.exports = router;
