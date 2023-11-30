import { combineReducers } from "redux";

import { userReducer } from './userReducer';
import { assignedTasksReducer, recievedTasksReducer } from './assignedTasksReducer';
import { tasksReducer } from './tasksReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
    assignedTasks: assignedTasksReducer,
    recievedTasks: recievedTasksReducer
});