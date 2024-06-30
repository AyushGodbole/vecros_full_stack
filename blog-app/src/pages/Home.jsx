import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { toggleTheme } from "../redux/slices/themeSlice";
import { logout } from "../redux/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const currentCat = useSelector((state) => state.blogs.currentCat);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 510);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "All";

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 510);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = currentCat === "All" || blog.category === currentCat;
    return matchesCategory;
  });

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h4" align="center">
        Some Blogs by Experts
      </Typography>
      <Grid container spacing={2} sx={{ padding: "0 70px", paddingBottom: "25px" }}>
        {filteredBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
            <Card
              component={Link}
              to={`/blogs/${blog._id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                border: theme === "dark" ? "1px solid #616161" : "1px solid #e0e0e0",
                borderRadius: "5px",
                boxShadow:
                  theme === "dark"
                    ? "0px 4px 8px rgba(255, 255, 255, 0.1), 0px 0px 15px rgba(255, 255, 255, 0.2)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(206, 186, 186, 0.2)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={blog.title}
                height="140"
                image={blog.image || "/default-image.jpg"}
                sx={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  By {blog.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
