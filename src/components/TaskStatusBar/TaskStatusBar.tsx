import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import { FC, Fragment, ReactElement } from 'react';

type CustomListItemProps = {
  primaryText: string;
  CustomIcon: () => ReactElement;
}

const CustomListItem: FC<CustomListItemProps> = ({
  primaryText,
  CustomIcon,
}) => {
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
                  <CustomIcon />
        </ListItemAvatar>
        <ListItemText primary={primaryText} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export const TaskStatusBar = () => {

    const totalTasks = 150;
    const totalReceivedTasks = 150;
    const totalTasksAssigned = 80;
    const completedTasksNumber = 10;
    const urgestTasksNumber = 20;
    const highPriorityTasksNumber = 30;
    const normalTasksNumber = 40;
    const cancelledTasksNumber = 50;

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={700}>
          Tasks Status
        </Typography>
        <Typography variant="h6" fontWeight={300}>
          Your Total Tasks: {totalTasks}
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <CustomListItem
            primaryText={`${completedTasksNumber} task(s) completed`}
            CustomIcon={() => <TaskAltIcon sx={{ color: "#3cb043" }} />}
          />
          <CustomListItem
            primaryText={`${urgestTasksNumber} urgent task(s)`}
            CustomIcon={() => (
              <NotificationImportantIcon sx={{ color: "red" }} />
            )}
          />
          <CustomListItem
            primaryText={`${highPriorityTasksNumber} high priority task(s)`}
            CustomIcon={() => <AlarmOnIcon sx={{ color: "orange" }} />}
          />
          <CustomListItem
            primaryText={`${normalTasksNumber} normal task(s)`}
            CustomIcon={() => <AssignmentIcon sx={{ color: "blue" }} />}
          />
          <CustomListItem
            primaryText={`${cancelledTasksNumber} task(s) cancelled`}
            CustomIcon={() => <CancelIcon sx={{ color: "grey" }} />}
          />
        </List>

        <Typography variant="h6" fontWeight={300}>
          Total Tasks Received: {totalReceivedTasks}
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <CustomListItem
            primaryText={`${completedTasksNumber} task(s) completed`}
            CustomIcon={() => <TaskAltIcon sx={{ color: "#3cb043" }} />}
          />
          <CustomListItem
            primaryText={`${urgestTasksNumber} urgent task(s)`}
            CustomIcon={() => (
              <NotificationImportantIcon sx={{ color: "red" }} />
            )}
          />
          <CustomListItem
            primaryText={`${highPriorityTasksNumber} high priority task(s)`}
            CustomIcon={() => <AlarmOnIcon sx={{ color: "orange" }} />}
          />
          <CustomListItem
            primaryText={`${normalTasksNumber} normal task(s)`}
            CustomIcon={() => <AssignmentIcon sx={{ color: "blue" }} />}
          />
          <CustomListItem
            primaryText={`${cancelledTasksNumber} task(s) cancelled`}
            CustomIcon={() => <CancelIcon sx={{ color: "grey" }} />}
          />
        </List>
        <Typography variant="h6" fontWeight={300}>
          Total Tasks Assigned: {totalTasksAssigned}
        </Typography>
      </Box>
    </Box>
  );
}
