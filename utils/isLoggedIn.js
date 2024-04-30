const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).redirect("/user/login");
    }

    req.user = user;
    req.user.password = undefined;
    return next();
  }
  res.status(404).redirect("/user/login");
};
