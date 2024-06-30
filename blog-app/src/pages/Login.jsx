import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Button, TextField, Typography, Paper, Grid, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(() => {
      // After successful login, navigate to the home page or any desired route
      navigate("/");
    });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/signup" color="primary">
              Sign Up
            </MuiLink>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
