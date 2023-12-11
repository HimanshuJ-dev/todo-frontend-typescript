import React from 'react';
import LoginBackgroundImage from '../../images/LoginBackground/LoginBackgroundImage.png'
import { Box } from '@mui/material';
import { LoginCard } from '../../components/LoginCard/LoginCard';
import { SignupCard } from '../../components/SignupCard/SignupCard';


export const Signup = () => {
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
            <SignupCard />
      </Box>
    );
}
