import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import { FC, Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { tasksResponseType } from '../../redux/tasks/tasksReducer';
import { assignedTasksResponseType, assignedTasksRootState, receivedTasksRootState } from '../../redux/assignedTasks/assignedTasksReducer';

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
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const ReceivedTasks = useSelector((state: receivedTasksRootState) => state.recievedTasks.tasks);
  const totalTasksAssigned = useSelector(
    (state: assignedTasksRootState) => state.assignedTasks.tasks
  ).length;

  const totalTasks = tasks.length;
  const totalReceivedTasks = ReceivedTasks.length;
  const completedTasksNumber = tasks.filter(
    (task: tasksResponseType) => task.status === "Completed"
  ).length;
  const urgestTasksNumber = tasks.filter(
    (task: tasksResponseType) =>
      task.priority === "Urgent" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const highPriorityTasksNumber = tasks.filter(
    (task: tasksResponseType) =>
      task.priority === "High" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const normalTasksNumber = tasks.filter(
    (task: tasksResponseType) =>
      task.priority === "Normal" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const cancelledTasksNumber = tasks.filter(
    (task: tasksResponseType) => task.status === "Cancelled"
  ).length;
  const completedReceivedTasksNumber = ReceivedTasks.filter(
    (task: assignedTasksResponseType) => task.status === "Completed"
  ).length;
  const urgestReceivedTasksNumber = ReceivedTasks.filter(
    (task: assignedTasksResponseType) =>
      task.priority === "Urgent" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const highPriorityReceivedTasksNumber = ReceivedTasks.filter(
    (task: assignedTasksResponseType) =>
      task.priority === "High" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const normalReceivedTasksNumber = ReceivedTasks.filter(
    (task: assignedTasksResponseType) =>
      task.priority === "Normal" &&
      task.status !== "Completed" &&
      task.status !== "Cancelled"
  ).length;
  const cancelledReceivedTasksNumber = ReceivedTasks.filter(
    (task: assignedTasksResponseType) => task.status === "Cancelled"
  ).length;

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
            primaryText={`${completedReceivedTasksNumber} task(s) completed`}
            CustomIcon={() => <TaskAltIcon sx={{ color: "#3cb043" }} />}
          />
          <CustomListItem
            primaryText={`${urgestReceivedTasksNumber} urgent task(s)`}
            CustomIcon={() => (
              <NotificationImportantIcon sx={{ color: "red" }} />
            )}
          />
          <CustomListItem
            primaryText={`${highPriorityReceivedTasksNumber} high priority task(s)`}
            CustomIcon={() => <AlarmOnIcon sx={{ color: "orange" }} />}
          />
          <CustomListItem
            primaryText={`${normalReceivedTasksNumber} normal task(s)`}
            CustomIcon={() => <AssignmentIcon sx={{ color: "blue" }} />}
          />
          <CustomListItem
            primaryText={`${cancelledReceivedTasksNumber} task(s) cancelled`}
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
