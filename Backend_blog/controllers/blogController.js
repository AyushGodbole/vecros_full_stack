const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary');
const fs = require('fs');

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content, author, category } = req.body;
  const thumbnail = req.file;
  let imageUrl = null;

  if (thumbnail) {
    try {
      const result = await cloudinary.v2.uploader.upload(thumbnail.path, {
        folder: 'blogs', // Cloudinary folder for organizing images
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(thumbnail.path); // Remove the file after uploading
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to upload image' });
    }
  }

  // Convert author to lowercase
  const updated_author = author.toLowerCase();

  const newBlog = new Blog({
    title,
    content,
    author: updated_author,
    category,
    image: imageUrl,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update a blog by ID
const updateBlog = async (req, res) => {
  const { title, content, author, category } = req.body;
  let imageUrl = req.body.image; // If no new image is uploaded, use existing URL

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'blogs',
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Remove the file after uploading
    } catch (error) {
      return res.status(500).json({ message: 'Failed to upload image' });
    }
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, category, image: imageUrl },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
