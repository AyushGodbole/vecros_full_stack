import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";
import { Button, TextField, Typography, Paper, Grid, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(""); // State for author field

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password, name, author })).then((response) => {
      console.log('res',response)
      if (response.payload.success) {
        // Navigate to home page upon successful registration
        navigate("/"); // Replace '/' with your desired home page route
      }
    });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <MuiLink component={Link} to="/login" color="primary">
              Login
            </MuiLink>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
