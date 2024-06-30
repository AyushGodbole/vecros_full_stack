// Layout.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { setCurrentCat } from "../redux/slices/blogSlice";
import { toggleTheme } from "../redux/slices/themeSlice";
import { logout } from "../redux/slices/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.categories);
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const [category, setCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All"); // New state
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 510);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 510);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = (category) => {
    setCategory(category);
    setSelectedCategory(category); // Update selected category state
    dispatch(setCurrentCat(category)); // Dispatch action to update current category
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log("Layout -> selectedCategory:", selectedCategory); // Add console log here

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#00152a" }}>
        <Toolbar sx={{ flexWrap: isSmallScreen ? "wrap" : "nowrap" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
              fontSize: isSmallScreen ? "16px" : "inherit",
              marginBottom: isSmallScreen ? "8px" : "0",
              textAlign: isSmallScreen ? "center" : "inherit",
            }}
          >
            G-Blogs
          </Typography>
          <div
            style={{
              display: "flex",
              gap: isSmallScreen ? "4px" : "16px",
              flexWrap: "wrap",
              justifyContent: isSmallScreen ? "center" : "inherit",
              width: isSmallScreen ? "100%" : "inherit",
              paddingBottom: isSmallScreen ? "12px" : "inherit",
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to={{
                pathname: "/create-blog",
                search: `?category=${encodeURIComponent(selectedCategory)}`, // Pass selected category as query param
              }}
              sx={{
                fontSize: isSmallScreen ? "10px" : "12px",
                textTransform: "none",
                backgroundColor: "#0b64b3",
                color: "white",
                padding: isSmallScreen ? "4px 8px" : "6px 12px",
              }}
            >
              Create Blog
            </Button>
            <Button
              variant="outlined"
              onClick={handleCategoryClick}
              style={{ textDecoration: "none", color: "inherit" }}
              sx={{
                fontSize: isSmallScreen ? "10px" : "12px",
                padding: isSmallScreen ? "4px 8px" : "6px 12px",
              }}
            >
              {category}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleCategoryClose("All")}>All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} onClick={() => handleCategoryClose(cat)}>
                  {cat}
                </MenuItem>
              ))}
            </Menu>
            <Switch
              color="default"
              onChange={handleThemeChange}
              inputProps={{ "aria-label": "toggle dark/light mode" }}
            />
            {user ? (
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{
                  fontSize: isSmallScreen ? "10px" : "12px",
                  padding: isSmallScreen ? "4px 8px" : "6px 12px",
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{
                    textTransform: isSmallScreen ? "none" : "inherit",
                    fontSize: isSmallScreen ? "10px" : "12px",
                    padding: isSmallScreen ? "4px 8px" : "6px 12px",
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  color="inherit"
                  sx={{
                    textTransform: isSmallScreen ? "none" : "inherit",
                    fontSize: isSmallScreen ? "10px" : "12px",
                    padding: isSmallScreen ? "4px 8px" : "6px 12px",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
