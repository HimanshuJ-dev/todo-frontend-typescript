import { Height } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react'

export const Home = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="space-around"
    >
      <div className="homeFirstDiv">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb="50px"
        >
          <img
            src={require("../../images/HomePageImage/Organising1.png")}
            alt="oragnising 1"
            width="60%"
          ></img>
        </Box>
        <div className="homeFirstDivTextContainer">
          <Typography
            variant="h1"
            fontWeight={700}
            textAlign="center"
            color="#007fff"
          >
            TASKIFY
          </Typography>
          <Typography variant="h4" textAlign="center" color="#007fff">
            A Personal Dashboard for all your To-Dos
          </Typography>
        </div>
      </div>
    </Box>
  );
}
