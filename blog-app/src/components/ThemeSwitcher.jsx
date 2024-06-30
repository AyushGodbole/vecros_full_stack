import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { Switch, FormControlLabel } from "@mui/material";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <FormControlLabel
      control={<Switch checked={theme === "dark"} onChange={handleThemeChange} />}
      label="Dark Mode"
    />
  );
};

export default ThemeSwitcher;
