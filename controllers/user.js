const User = require("../models/user");
const Blog = require("../models/blog");
const sendMail = require("../utils/sendMail");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const OTP = Math.floor(100000 + Math.random() * 900000);
  const user = await User.create({ fullName, email, password, OTP });

  const subject = "Welcome to Blogify!";
  const html = `<h1>Welcome ${fullName}!</h1><p>Thank you for signing up for Blogify!</p> <br>  Here's is your OTP: ${OTP}`;
  sendMail(email, subject, html);

  const token = user.createJWTToken();
  res.render("verify", { token, error: null, user: null });
};

exports.verify = async (req, res) => {
  const { token } = req.params;
  const { OTP } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);

  if (user.OTP === parseInt(OTP)) {
    user.OTP = undefined;
    await user.save();

    createToken(user, res);
    return res.redirect("/user/profile");
  } else {
    return res.render("verify", { token, error: "Invalid OTP", user: null });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.redirect("/");

  if (user.verifyPassword(password)) {
    user.password = undefined;
    createToken(user, res);
    return res.redirect("/user/profile");
  }
  res.redirect("/");
};

exports.getProfile = async (req, res) => {
  const blogs = await Blog.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  res.render("home", { user: req.user, blogs });
};
