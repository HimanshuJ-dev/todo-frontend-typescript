import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Delete } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const AssignedTasks = () => {
  const [loading, setLoading] = useState(true);

  //fake task
  const taskTitle = "Task 1 title";
  const taskPriority = "High";
  let taskStatus = "Pending";
    const taskDesc = "Task 1 description";
    const taskReceiver = "first@gmail.com";
  //fake task end

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

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {taskTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <b>To: </b>
          {taskReceiver}
        </Typography>
        {taskStatus === "Pending" ? (
          <Typography sx={{ mb: 1.5 }}>
            <b>Priority:</b>{" "}
            <span style={{ color: statusColor(taskPriority) }}>
              {taskPriority}
            </span>
          </Typography>
        ) : (
          <Typography sx={{ mb: 1.5 }}>
            <b>Status:</b>{" "}
            <span style={{ color: statusColor(taskStatus) }}>{taskStatus}</span>
          </Typography>
        )}
        <Typography variant="body1">
          <b>Task Description:</b> {taskDesc}
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
}