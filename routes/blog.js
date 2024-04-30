const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `../public/uploads`));
  },
  filename: function (req, file, cb) {
    if (req.body.prevImage)
      fs.unlinkSync(path.resolve(__dirname, `../public${req.body.prevImage}`));
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

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
router.post("/addBlog", upload.single("image"), addBlog);
router.get("/:id", getBlog);

router.put("/update/:id", upload.single("image"), updateBlog);

router.delete("/delete/:id", deleteBlog);
module.exports = router;
