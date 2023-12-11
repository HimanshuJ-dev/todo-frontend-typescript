import React from 'react';
import {
  Button,
  Card,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Send } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createTasksFetch } from '../../redux/actions/tasksActions';
import { assignTaskFetch } from '../../redux/actions/assignedTasksActions';
import { displayError } from '../LoginCard/LoginCard';
import { userRootState } from '../../redux/reducers/userReducer';

export const AssignTask = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);

  const [recieverEmail, setRecieverEmail] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [recieverEmailError, setRecieverEmailError] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the email address and password.
    if (recieverEmail.length < 1) {
      setRecieverEmailError("Please enter a Reciever Email");
    } else if (taskName.length < 1) {
      setTaskNameError("Please enter a title");
    } else if (
      priority !== "Normal" &&
      priority !== "High" &&
      priority !== "Urgent"
    ) {
      console.log(priority);
      setPriorityError("Please set a priority");
    } else if (description.length < 1) {
      setDescriptionError("Please Enter a description");
    } else {
      // Fetch the user data from an API.
      dispatch(
        assignTaskFetch(
          recieverEmail,
          taskName,
          description,
          priority,
          currentUser as String
        )
      );
    }
  };

  // Add a function to clear the errors when the input values change.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "taskReceiver") {
      setRecieverEmail(value);
    } else if (name === "title") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "priority") {
      setPriority(value);
    }
    // Clear the email and password errors.
    setRecieverEmailError("");
    setTaskNameError("");
    setDescriptionError("");
    setPriorityError("");
  };
  
  return (
    <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px", p: "10px" }}>
      <Stack spacing={2}>
        <Typography width="100%" variant="h5" textAlign="center">
          New Task
        </Typography>
        {recieverEmailError && displayError(recieverEmailError)}
        {taskNameError && displayError(taskNameError)}
        {descriptionError && displayError(descriptionError)}
        {priorityError && displayError(priorityError)}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Receiver"
            type="email"
            name="taskReceiver"
            value={recieverEmail}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Task Title"
            name="title"
            value={taskName}
            onChange={handleInputChange}
            required
            sx={{ mb: "10px" }}
            fullWidth
          />
          <TextField
            label="Select Priority"
            select
            name="priority"
            value={priority}
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
            fullWidth
            required
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </TextField>
          <TextField
            label="Task Description"
            required
            name="description"
            value={description}
            onChange={handleInputChange}
            multiline
            sx={{ mb: "10px" }}
            fullWidth
            rows={4}
          />
          <Grid container justifyContent="space-evenly">
            <Button variant="outlined" type='reset' startIcon={<Delete />}>
              Reset
            </Button>
            <Button variant="contained" type='submit' endIcon={<Send />}>
              Assign
            </Button>
          </Grid>
        </form>
      </Stack>
    </Card>
  );
}
