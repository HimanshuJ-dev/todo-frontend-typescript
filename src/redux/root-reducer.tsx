import { combineReducers } from "redux";

import { userReducer } from './user/userReducer';
import { assignedTasksReducer, recievedTasksReducer } from './assignedTasks/assignedTasksReducer';
import { tasksReducer } from './tasks/tasksReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
    assignedTasks: assignedTasksReducer,
    recievedTasks: recievedTasksReducer
});