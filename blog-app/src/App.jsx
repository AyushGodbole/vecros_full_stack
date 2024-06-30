// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import BlogDetail from "./components/BlogDetail";
import BlogForm from "./components/BlogForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout"; // Adjust the import path as needed

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/create-blog" element={<BlogForm />} />
            <Route path="/edit-blog/:id" element={<BlogForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" /> {/* Set the position to top-right */}
    </ThemeProvider>
  );
};

export default App;
