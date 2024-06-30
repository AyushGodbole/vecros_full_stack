const express = require('express');
const multer = require('multer');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('image'), createBlog); // Add multer middleware
router.put('/:id', upload.single('image'), updateBlog); // Add multer middleware
router.delete('/:id', deleteBlog);

module.exports = router;
