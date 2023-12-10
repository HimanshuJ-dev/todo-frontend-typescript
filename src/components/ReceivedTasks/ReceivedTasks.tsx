import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Delete } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from 'react-redux';
import { assignedTasksFetch, markAssignedTaskCancelledFetch, markAssignedTaskCompletedFetch, recievedTasksFetch } from '../../redux/actions/assignedTasksActions';
import { deleteTaskFetch } from '../../redux/actions/tasksActions';
import { assignedTasksResponseType } from '../../redux/reducers/assignedTasksReducer';

export const ReceivedTasks = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.response?.userId);
  const tasks = useSelector((state: any) => state.recievedTasks.tasks);

  useEffect(() => {
    dispatch(recievedTasksFetch(currentUser));
  }, []);

  const DeleteTask = (taskId: String, currentUser: String) => {
    // console.log("currentUser from list:", currentUser);
    dispatch(deleteTaskFetch(taskId, currentUser));
  };

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
        <Grid container justifyContent="space-between">
          <CardActions>
            <IconButton aria-label="Mark as Completed">
              <BorderColorIcon />
            </IconButton>
          </CardActions>
          <CardActions>
            <IconButton aria-label="Mark as Completed">
              <DoneIcon />
            </IconButton>
            <IconButton aria-label="Mark as Cancelled">
              <ClearIcon />
            </IconButton>
            <IconButton aria-label="Delete">
              <Delete />
            </IconButton>
          </CardActions>
        </Grid>
      </Card>
    );
  });

  return (
    <Box>
      <Typography width="100%" variant="h5" textAlign="center">
        Assigned Tasks
      </Typography>
      {singleAssignedTaskCard}
    </Box>
  );
}