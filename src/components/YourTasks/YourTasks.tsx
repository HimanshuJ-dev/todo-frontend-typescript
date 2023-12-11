import { Delete } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch,useSelector } from 'react-redux';
import { deleteTaskFetch, getTasksFetch, markTaskCancelledFetch, markTaskCompletedFetch } from '../../redux/actions/tasksActions';
import { UserState, userRootState } from '../../redux/reducers/userReducer';
import { tasksResponseType, tasksRootState, tasksState } from '../../redux/reducers/tasksReducer';
import { assignedTasksFetch, recievedTasksFetch } from '../../redux/actions/assignedTasksActions';
import { Link } from 'react-router-dom';

export const YourTasks = () => {


  const dispatch = useDispatch();
  // const currentUser = useSelector((state: UserState) => state.response?.userId);
  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);

  const isTasksLoading = useSelector((state: tasksRootState) => state.tasks.isTasksLoading);
  
  const tasks = useSelector((state: tasksRootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(getTasksFetch(currentUser!));
    dispatch(assignedTasksFetch(currentUser as String));
    dispatch(recievedTasksFetch(currentUser as String));
  }, []);

  const DeleteTask = (taskId: String, currentUser: String) => {
    console.log("currentUser from list:", currentUser);
    dispatch(deleteTaskFetch( taskId, currentUser ));
  };
  const markTaskAsCompeleted = (taskId: String, currentUser: String) => {
    dispatch(markTaskCompletedFetch(taskId, currentUser));
  };
  const markTaskAsCancelled = (taskId: String, currentUser: String) => {
    dispatch(markTaskCancelledFetch(taskId, currentUser));
  };

    const statusColor = (status: String) => {
        switch (status) {
            case "Urgent":
                return "red"
            case "High":
                return "orange"
            case "Normal":
                return "blue"
            case "Completed":
                return "#3cb043"
            case "Cancelled":
                return "grey"
            default:
                return "grey"
        }
    }

  //change this to some known solution
  const SingleTaskCard = (tasks as Array<tasksResponseType>).map((task) => {
    return (
      <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            {task.title}
          </Typography>
          {task.status === "Pending" ? (
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              <b>Priority: </b>
              <b>
                <span style={{ color: statusColor(task.priority) }}>
                  {task.priority}
                </span>
              </b>
            </Typography>
          ) : (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
            {task.status === "Pending" && (
              <Link
                to={{
                  pathname: "/edit-task",
                }}
                state={task}
              >
                <IconButton aria-label="Mark as Completed">
                  <BorderColorIcon />
                </IconButton>
              </Link>
            )}
          </CardActions>
          <CardActions>
            {task.status === "Pending" && (
              <IconButton
                aria-label="Mark as Completed"
                onClick={() =>
                  markTaskAsCompeleted(task._id, currentUser as String)
                }
              >
                <DoneIcon />
              </IconButton>
            )}
            {task.status === "Pending" && (
              <IconButton
                aria-label="Mark as Cancelled"
                onClick={() =>
                  markTaskAsCancelled(task._id, currentUser as String)
                }
              >
                <ClearIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="Delete"
              onClick={() => DeleteTask(task._id, currentUser as String)}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </Grid>
      </Card>
    );
  });

  return (
    <Box>
      <Typography width="100%" variant="h5" textAlign="center" mb="20px">
        Your Tasks
      </Typography>
      {isTasksLoading ? (
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
        SingleTaskCard
      )}
    </Box>
  );
}