require("dotenv").config();
require("./config")();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.render("home", { user: null });
});

app.listen(PORT, () => console.log(`Server running`));
