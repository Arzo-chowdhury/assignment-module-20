
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

router.route('/')
  .get(protect, getAllBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;