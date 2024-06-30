import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, TextField } from "@mui/material";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <List>
        {filteredBlogs.map((blog) => (
          <ListItem key={blog._id} component={Link} to={`/blogs/${blog._id}`}>
            <ListItemText primary={blog.title} secondary={blog.excerpt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogList;
