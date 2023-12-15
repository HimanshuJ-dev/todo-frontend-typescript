import { Box, Card, CardActions, CardContent, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Delete } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from 'react-redux';
import { assignedTasksFetch, markAssignedTaskCancelledFetch, markAssignedTaskCompletedFetch, recievedTasksFetch } from '../../redux/assignedTasks/assignedTasksActions';
import { deleteTaskFetch } from '../../redux/tasks/tasksActions';
import { assignedTasksResponseType, receivedTasksRootState } from '../../redux/assignedTasks/assignedTasksReducer';
import { userRootState } from '../../redux/user/userReducer';

export const ReceivedTasks = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);
  const tasks = useSelector((state: receivedTasksRootState) => state.recievedTasks.tasks);
  const isReceivedTasksLoading = useSelector((state: receivedTasksRootState) => state.recievedTasks.isTasksLoading);

  useEffect(() => {
    dispatch(recievedTasksFetch(currentUser as String));
  }, []);

  const markTaskAsCompeleted = (taskId: String, currentUser: String) => {
    dispatch(markAssignedTaskCompletedFetch(taskId, currentUser));
  };
  const markTaskAsCancelled = (taskId: String, currentUser: String) => {
    dispatch(markAssignedTaskCancelledFetch(taskId, currentUser));
  };

  const statusColor = (status: String) => {
    switch (status) {
      case "Urgent":
        return "red";
      case "High":
        return "orange";
      case "Normal":
        return "blue";
      case "Completed":
        return "#3cb043";
      case "Cancelled":
        return "grey";
      default:
        return "grey";
    }
  };

  const singleAssignedTaskCard = (
    tasks as Array<assignedTasksResponseType>
  ).map((task) => {
    return (
      <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            <b>From: </b>
            {task.creatoremail}
          </Typography>
          {task.status === "Pending" ? (
            <Typography sx={{ mb: 1.5 }}>
              <b>Priority:</b>{" "}
              <span style={{ color: statusColor(task.priority) }}>
                {task.priority}
              </span>
            </Typography>
          ) : (
            <Typography sx={{ mb: 1.5 }}>
              <b>Status:</b>{" "}
              <span style={{ color: statusColor(task.status) }}>
                {task.status}
              </span>
            </Typography>
          )}
          <Typography variant="body1">
            <b>Task Description:</b> {task.description}
          </Typography>
        </CardContent>
        <Grid container justifyContent="space-between" width="100%">
          <CardActions sx={{ width: "100%", alignItems: "end" }}>
            {task.status === "Pending" && <IconButton
              onClick={() => markTaskAsCompeleted(task._id, currentUser as String)}
              aria-label="Mark as Completed"
            >
              <DoneIcon />
            </IconButton>}
            {task.status === "Pending" && <IconButton
              onClick={() => markTaskAsCancelled(task._id, currentUser as String)}
              aria-label="Mark as Cancelled"
            >
              <ClearIcon />
            </IconButton>}
          </CardActions>
        </Grid>
      </Card>
    );
  });

  return (
    <Box>
      <Typography width="100%" variant="h5" textAlign="center" mb="20px">
        Received Tasks
      </Typography>
      {isReceivedTasksLoading ? (
        <Fragment>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mb: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mb: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mb: "20px" }}
          />
        </Fragment>
      ) : (
        singleAssignedTaskCard
      )}
    </Box>
  );
}