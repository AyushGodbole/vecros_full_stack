import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

const CategoryPage = () => {
  const { category } = useParams();
  const blogs = useSelector((state) =>
    state.blogs.blogs.filter((blog) => blog.category === category)
  );

  return (
    <div>
      <h1>{category} Blogs</h1>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog._id} component={Link} to={`/blogs/${blog._id}`}>
            <ListItemText primary={blog.title} secondary={blog.excerpt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryPage;
