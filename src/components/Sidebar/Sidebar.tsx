import { Home } from "@mui/icons-material";
import {
  Box,
  List,  
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { turnOnDarkMode, turnOnLightMode } from "../../redux/user/userActions";
import { userRootState } from "../../redux/user/userReducer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const Sidebar: React.FC = () => {

  const currentMode = useSelector((state: userRootState) => state.user.darkmode)

  const dispatch = useDispatch();

  const modeToggleHandle = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.checked) {
      // The switch is turned on
      dispatch(turnOnDarkMode())
      // Add your specific function for ON state here
    } else {
      // The switch is turned off
      dispatch(turnOnLightMode())
      // Add your specific function for OFF state here
    }
  };

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/tasks">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Your Tasks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create-task">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Task" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/assign-task">
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="Assign Task" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/assigned-tasks">
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Assigned Tasks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/received-tasks">
              <ListItemIcon>
                <CallReceivedIcon />
              </ListItemIcon>
              <ListItemText primary="Recieved Tasks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/all-users">
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="All Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#dark-mode">
              <ListItemIcon>
                <NightlightIcon />
              </ListItemIcon>
              <Switch
                checked={currentMode === "dark" ? true : false}
                onChange={modeToggleHandle}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
