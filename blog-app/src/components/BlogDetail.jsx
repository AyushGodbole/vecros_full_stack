import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { deleteBlog, fetchBlogById, updateBlog } from "../redux/slices/blogSlice";
import { CATEGORIES } from "../constants/categories"; // Import your categories

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.blogs.find((b) => b._id === id));
  const loggedInUser = useSelector((state) => state.auth.user); // Get logged-in user info
  // console.log(loggedInUser)

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:750px)");
  const isTablet = useMediaQuery("(max-width:1000px)");

  useEffect(() => {
    if (id) {
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setCategory(blog.category);
      } else {
        dispatch(fetchBlogById(id));
      }
    }
  }, [id, blog, dispatch]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const formData = {
      id,
      title,
      content,
      category,
    };
    console.log('Updating blog with:', formData); // Check formData before dispatching
    dispatch(updateBlog(formData));
    setEditMode(false);
  };
  
  const handleDelete = () => {
    dispatch(deleteBlog(id));
    navigate("/");
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {blog ? (
        <Box sx={{ maxWidth: '900px', margin: 'auto', display: 'flex', gap: isMobile ? "20px" : "60px", flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start', marginTop: isMobile ? '20px' : '45px' }}>
          {!editMode ? (
            <>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ maxWidth: "100%", borderRadius: 8, height: isMobile ? '250px' : "450px", objectFit: "cover" }}
                />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ marginBottom: "8px", fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{blog.title}</Typography>
                <Typography variant="body2" sx={{ marginTop: 2, textAlign: "justify", fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  {blog.content}{console.log('blog-auth',blog.author)}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1, fontSize: isMobile ? '0.8rem' : '1rem' }}>
                  Category: {blog.category}
                </Typography>
                {loggedInUser && blog.author === loggedInUser.author && ( // Check if logged in user is the author
                  <Box sx={{ marginTop: 2, display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center", fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Edit Blog</Typography>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                sx={{ marginBottom: 2, width: isTablet ? '100%' : '100%' }}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={isMobile ? 4 : 6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
                sx={{ marginBottom: 2, width: isTablet ? '100%' : '100%' }}
              />
              <TextField
                select
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
                sx={{ marginBottom: 2, width: isTablet ? '100%' : '100%' }}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <Box>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this blog?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogDetails;
