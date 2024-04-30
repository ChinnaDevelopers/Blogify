require("dotenv").config();
require("./config")();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/user/profile");
  }
  res.render("home", { user: null, blogs: [] });
});
app.use("/user", require("./routes/user"));
app.use("/blog", require("./routes/blog"));

app.listen(PORT, () => console.log(`Server running`));
