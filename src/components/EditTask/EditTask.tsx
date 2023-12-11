import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTasksFetch, editTaskFetch } from '../../redux/actions/tasksActions';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { displayError } from '../LoginCard/LoginCard';
import { Delete, Save } from '@mui/icons-material';
import { userRootState } from '../../redux/reducers/userReducer';

export const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const currentUser = useSelector((state: userRootState) => state.user.response?.userId);

  const [taskName, setTaskName] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [priority, setPriority] = useState(state.priority);
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the email address and password.
    if (taskName.length < 1) {
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
      dispatch(editTaskFetch(state._id, taskName, description, priority, currentUser as String));
    }
  };

  // Add a function to clear the errors when the input values change.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "title") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "priority") {
      setPriority(value);
    }
    // Clear the email and password errors.
    setTaskNameError("");
    setDescriptionError("");
    setPriorityError("");
  };

  return (
    <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px", p: "10px" }}>
      <Stack spacing={2}>
        <Typography width="100%" variant="h5" textAlign="center">
          Edit Task
        </Typography>
        {taskNameError && displayError(taskNameError)}
        {descriptionError && displayError(descriptionError)}
        {priorityError && displayError(priorityError)}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            name="title"
            value={taskName}
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
            required
            fullWidth
          />
          <TextField
            label="Select Priority"
            select
            name="priority"
            sx={{ mb: "10px" }}
            value={priority}
            onChange={handleInputChange}
            fullWidth
            required
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </TextField>
          <TextField
            label="Task Description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
            multiline
            sx={{ mb: "10px" }}
            fullWidth
            rows={4}
          />
          <Grid container justifyContent="space-evenly">
            <Button variant="contained" type="submit" endIcon={<Save />}>
              Update
            </Button>
          </Grid>
        </form>
      </Stack>
    </Card>
  );
}
