import { createSelector } from "reselect";

import { RootState } from "../store";

import { tasksState } from "./tasksReducer";

export const selectTasksReducer = (state: RootState): tasksState => state.tasks;

export const selectCurrentTasks = createSelector(
  selectTasksReducer,
  (tasks) => tasks.tasks
);