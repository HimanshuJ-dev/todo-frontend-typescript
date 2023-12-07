import { Box } from '@mui/material';
import React from 'react'
import { YourTasks } from '../YourTasks/YourTasks';
import {CreateTask} from '../CreateTask/CreateTask';
import { Routes } from 'react-router-dom';

export const MainFeed = () => {

    const CurrentFeed = "your-tasks";

    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
        </Box>
    );
}
