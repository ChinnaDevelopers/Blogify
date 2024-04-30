const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../utils/isLoggedIn");
const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

router.use(isLoggedIn);
router.get("/addBlog", (req, res) => {
  res.render("addBlog", { user: req.user });
});
router.post("/addBlog", addBlog);
router.get("/:id", getBlog);

router.put("/update/:id", updateBlog);

router.delete("/delete/:id", deleteBlog);
module.exports = router;
