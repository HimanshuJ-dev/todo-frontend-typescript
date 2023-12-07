import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Typography,
  createTheme,
} from "@mui/material";
import { Icons, StyledToolbar, UserBox } from "./navbarStyled";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import { useState } from "react";
import { Link } from "react-router-dom";

const theme = createTheme();

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const currentUser = "";

  const UserName = "Himanshu Jhajharia";

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, textDecoration: "none", color: "white" }}
          component={Link}
          to="/"
        >
          Taskify
        </Typography>
        <RuleFolderIcon sx={{ display: { xs: "block", sm: "none" } }} />
        {currentUser ? (
          <Box>
            <Icons theme={theme}>
              <Avatar
                sx={{ width: "30", height: "30" }}
                src="https://cdn.spinn.com/assets/img/img-user.jpeg"
                onClick={(e) => setOpen(true)}
              />
            </Icons>
            <UserBox theme={theme} onClick={(e) => setOpen(true)}>
              <Typography>{UserName}</Typography>
              <Avatar
                sx={{ width: "30", height: "30" }}
                src="https://cdn.spinn.com/assets/img/img-user.jpeg"
              />
            </UserBox>
          </Box>
        ) : (
          <ButtonGroup variant="outlined">
            <Button sx={{ color: "white" }} component={Link} to="/login">
              Login
            </Button>
            <Button sx={{ color: "white" }} component={Link} to="/signup">
              Sign Up
            </Button>
          </ButtonGroup>
        )}
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};
