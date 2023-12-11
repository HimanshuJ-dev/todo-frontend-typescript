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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserState, userRootState } from "../../redux/reducers/userReducer";
import { signOutUser } from "../../redux/actions/userActions";
import PersonIcon from "@mui/icons-material/Person";

const theme = createTheme();

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);

  const UserName = useSelector((state: userRootState) => state.user.response?.name);

  const signOutHandler = () => {
    console.log("sign out");
    dispatch(signOutUser());
    setOpen(false)
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" },
            textDecoration: "none",
            color: "white",
          }}
          component={Link}
          to="/"
        >
          Taskify
        </Typography>
        <RuleFolderIcon sx={{ display: { xs: "block", sm: "none" } }} />
        {currentUser ? (
          <Box>
            <Icons theme={theme}>
              {/* <Avatar
                sx={{ width: "30", height: "30" }}
                src="https://cdn.spinn.com/assets/img/img-user.jpeg"
                onClick={(e) => setOpen(true)}
              /> */}
              <PersonIcon onClick={(e) => setOpen(true)} />
            </Icons>
            <UserBox theme={theme} onClick={(e) => setOpen(true)}>
              <Typography>{UserName}</Typography>
              {/* <Avatar
                sx={{ width: "30", height: "30" }}
                src="https://cdn.spinn.com/assets/img/img-user.jpeg"
              /> */}
              <PersonIcon />
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
        <MenuItem onClick={signOutHandler}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};
