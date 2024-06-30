import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, MenuItem, CircularProgress, Grid, Box, Typography } from "@mui/material";
import { createBlog, updateBlog, fetchBlogById } from "../redux/slices/blogSlice";
import { CATEGORIES } from "../constants/categories";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const blog = useSelector((state) => state.blogs.blogs.find((b) => b._id === id));
    const user = useSelector((state) => state.auth.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        if (id) {
            if (blog) {
                setTitle(blog.title);
                setContent(blog.content);
                setCategory(blog.category);
                setAuthor(blog.author);
                setImagePreview(blog.image);
            } else {
                dispatch(fetchBlogById(id));
            }
        }
    }, [id, blog, dispatch, navigate, user]);

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleValidation = () => {
        if (!title || !content || !category || !author) {
            toast.error("Please fill all fields", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("content", content);
                formData.append("category", category);
                formData.append("author", author);
                if (image) {
                    formData.append("image", image);
                }

                if (id) {
                    await dispatch(updateBlog({ id, formData })).unwrap();
                    toast.success("Blog updated successfully", toastOptions);
                } else {
                    await dispatch(createBlog(formData)).unwrap();
                    toast.success("Blog created successfully", toastOptions);
                }
                navigate("/");
            } catch (error) {
                toast.error("Failed to create/update blog", toastOptions);
                console.error("Blog submission error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setCategory(value);
        } else if (name === "author") {
            setAuthor(value);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Grid container justifyContent="center" style={{ padding: '20px' }}>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        encType="multipart/form-data" 
                        sx={{ 
                            bgcolor: 'background.paper', 
                            boxShadow: 3, 
                            borderRadius: 2, 
                            p: 3, 
                            mt: 3 
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            {id ? "Edit Blog" : "Create Blog"}
                        </Typography>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <TextField
                            select
                            label="Category"
                            name="category"
                            value={category}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        >
                            {CATEGORIES.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Author"
                            name="author"
                            value={author}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </Button>
                        {imagePreview && (
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Preview"
                                sx={{ 
                                    width: '100%', 
                                    maxWidth: 300, 
                                    height: 'auto', 
                                    mb: 2, 
                                    borderRadius: 1 
                                }}
                            />
                        )}
                        {loading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                my={3}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="space-between" mt={3}>
                                <Button type="submit" variant="contained" color="primary">
                                    {id ? "Update Blog" : "Create Blog"}
                                </Button>
                                <Button onClick={handleBack} variant="outlined">
                                    Back
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    );
};

export default BlogForm;
