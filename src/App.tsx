import React, { useState } from 'react';
import { Box, PaletteMode, Stack, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskStatusBar } from './components/TaskStatusBar/TaskStatusBar';
import { MainFeed } from './components/MainFeed/MainFeed';
import { Route, Routes } from 'react-router-dom';
import { YourTasks } from './components/YourTasks/YourTasks';
import { CreateTask } from './components/CreateTask/CreateTask';
import { AssignTask } from './components/AssignTask/AssignTask';
import { AssignedTasks } from './components/AssignedTasks/AssignedTasks';
import { ReceivedTasks } from './components/ReceivedTasks/ReceivedTasks';
import { EditTask } from './components/EditTask/EditTask';
import { EditAssignedTask } from './components/EditAssignedTask/EditAssignedTask';
import { Home } from './Views/Home/Home';
import { Login } from './Views/Login/Login';
import { Signup } from './Views/Signup/Signup';
import { useSelector } from 'react-redux';
import { UserState, userRootState } from './redux/user/userReducer';
import { Spinner } from './components/Spinner/Spinner';
import { AllUsers } from './components/AllUsers/AllUsers';

function App() {

  const mode = useSelector((state: userRootState) => state.user.darkmode);

  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);
  
  const isUserLoading = useSelector((state: userRootState) => state.user.isLoggingIn)

  const darkTheme = createTheme({
    palette: {
      mode: mode as PaletteMode
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        minHeight="100vh"
      >
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {isUserLoading ? (
            <Spinner />
          ) : currentUser ? (
            <>
              <Sidebar />
              <Box flex={4} p={{ xs: 0, md: 2 }}>
                <Routes>
                  <Route index element={<YourTasks />} />
                  <Route>
                    <Route path="tasks/*" element={<YourTasks />} />
                    <Route path="assign-task/*" element={<AssignTask />} />
                    <Route
                      path="assigned-tasks/*"
                      element={<AssignedTasks />}
                    />
                    <Route
                      path="received-tasks/*"
                      element={<ReceivedTasks />}
                    />
                    <Route path="create-task" element={<CreateTask />} />
                    <Route path="edit-task" element={<EditTask />} />
                    <Route
                      path="edit-assigned-task"
                      element={<EditAssignedTask />}
                    />
                    <Route
                      path="all-users"
                      element={<AllUsers />}
                    />
                  </Route>
                  <Route path="signup" element={<YourTasks />} />
                  <Route path="login" element={<YourTasks />} />
                </Routes>
              </Box>
              <TaskStatusBar />
            </>
          ) : (
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          )}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
