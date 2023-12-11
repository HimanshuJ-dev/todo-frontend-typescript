import { CircularProgress } from '@mui/material';
import React from 'react'

export const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
              height: "100vh",
        width: "100%"
      }}
    >
      <CircularProgress />
    </div>
  );
};