import { createSelector } from "reselect";

import { RootState } from "../store";

import { assignedTasksState, recievedTasksState } from "./assignedTasksReducer";

export const selectAssignedTasksReducer = (state: RootState): assignedTasksState => state.tasks;

export const selectAssignedTasks = createSelector(
  selectAssignedTasksReducer,
  (tasks) => tasks.tasks
);

export const selectRecievedTasksReducer = (state: RootState): recievedTasksState => state.tasks;

export const selectRecievedTasks = createSelector(
  selectRecievedTasksReducer,
  (tasks) => tasks.tasks
);
