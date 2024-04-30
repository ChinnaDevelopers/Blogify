const User = require("../models/user");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.redirect("/");

  if (user.verifyPassword(password)) {
    return res.render("home", { user });
  }
  res.redirect("/");
};
exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({ fullName, email, password });
  res.redirect("/");
};
