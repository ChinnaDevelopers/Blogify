const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signup, signin } = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
