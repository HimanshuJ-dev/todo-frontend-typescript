
import { Delete, Save } from '@mui/icons-material';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';

export const CreateTask = () => {
    let priority;
    const handleChange = () => {
        
    }
    return (
      <Card sx={{ minWidth: 275, mb: "5px", borderRadius: "10px", p: "10px" }}>
        <Stack spacing={2}>
          <Typography width="100%" variant="h5" textAlign="center">
            New Task
          </Typography>
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
            <Button variant="contained" endIcon={<Save />}>
              Save
            </Button>
          </Grid>
        </Stack>
      </Card>
    );
}
