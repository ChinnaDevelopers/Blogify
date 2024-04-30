const Blog = require("../models/blog");

exports.addBlog = async (req, res) => {
  const { title, content } = req.body;
  const createdBy = req.user._id;

  await Blog.create({ title, content, createdBy });
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
  await Blog.findByIdAndUpdate(id, { title, content });
  res.json({ success: true });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.json({ success: true });
};
