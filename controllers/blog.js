const Blog = require("../models/blog");
const fs = require("fs");
const path = require("path");

exports.addBlog = async (req, res) => {
  const { title, content } = req.body;
  const createdBy = req.user._id;
  const image = `/uploads/${req.file.filename}`;
  await Blog.create({ title, content, createdBy, image });
  res.redirect("/user/profile");
};

exports.getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("blog", { user: req.user, blog });
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (req.file) {
    const image = `/uploads/${req.file.filename}`;
    await Blog.findByIdAndUpdate(id, { title, content, image });
    return res.json({ success: true });
  }
  await Blog.findByIdAndUpdate(id, { title, content });
  res.json({ success: true });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  fs.unlinkSync(path.resolve(__dirname, `../public${req.query.prevImage}`));
  await Blog.findByIdAndDelete(id);
  res.json({ success: true });
};
