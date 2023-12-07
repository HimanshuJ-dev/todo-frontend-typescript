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

export const AssignTask = () => {

  let priority;
  const handleChange = () => { };
  
  return (
    <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px", p: "10px" }}>
      <Stack spacing={2}>
        <Typography width="100%" variant="h5" textAlign="center">
          New Task
        </Typography>
        <TextField label="Receiver" required fullWidth type='email'/>
        <TextField label="Task Title" required fullWidth />
        <TextField
          label="Select Priority"
          select
          value={priority}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </TextField>
        <TextField label="Task Description" required multiline rows={4} />
        <Grid container justifyContent="space-evenly">
          <Button variant="outlined" startIcon={<Delete />}>
            Reset
          </Button>
          <Button variant="contained" endIcon={<Send />}>
            Assign
          </Button>
        </Grid>
      </Stack>
    </Card>
  );
}
