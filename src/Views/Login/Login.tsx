import React from 'react'
import { LoginCard } from '../../components/LoginCard/LoginCard'
import { Box } from '@mui/material';
import LoginBackgroundImage from '../../images/LoginBackground/LoginBackgroundImage.png'

export const Login = () => {
    return (
      <Box
        minHeight="100vh"
        width="100%"
            sx={{
          backgroundImage: `url(${LoginBackgroundImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "50%",
        }}
      >
        <LoginCard />
      </Box>
    );
}
