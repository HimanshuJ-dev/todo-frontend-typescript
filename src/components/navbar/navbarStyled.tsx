import styled from "@emotion/styled";
import { Toolbar, Box, Theme } from "@mui/material";

export const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});


export const Icons = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  ":hover": {
    cursor: "pointer"
  }
}));

export const UserBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  ":hover": {
    cursor: "pointer",
  },
}));