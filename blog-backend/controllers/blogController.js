
const Blog = require('../models/Blog');

//blog creat


const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// all blog


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//update blog


const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogId = req.params.id;

    const blog = await Blog.findOne({ _id: blogId, author: req.user._id });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or not authorized' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//delet blog

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findOne({ _id: blogId, author: req.user._id });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or not authorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};