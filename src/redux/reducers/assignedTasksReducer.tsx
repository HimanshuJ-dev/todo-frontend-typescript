import { ASSIGNED_TASK_TYPES } from "../types/assignedTasksTypes";

type assignedTasksResponseType = {
  title: String;
  description: String;
  priority: String;
  status: String;
  creator: String;
};

export type assignedTasksState = {
  readonly tasks: assignedTasksResponseType | null;
  readonly isTasksLoading: boolean;
  readonly errorTasks: String | null;
  readonly isCreatingTask: boolean;
};

export type recievedTasksState = {
  readonly tasks: assignedTasksResponseType | null;
  readonly isTasksLoading: boolean;
  readonly errorTasks: String | null;
  readonly isCreatingTask: boolean;
};

const INITIAL_TASKS_ASSIGNED = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  isCreatingTask: false,
};

const INITIAL_TASKS_RECIEVED = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  isCreatingTask: false,
};

type actionType = {
  type: String;
  response?: assignedTasksResponseType[];
};

export const assignedTasksReducer = (
  state = INITIAL_TASKS_ASSIGNED,
  action: actionType
) => {
    switch (action.type) {
        case ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_LOADING:
            return {
                ...state,
                isTasksLoading: true,
                errorTasks: null
            }
        case ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_SUCCESS:
            return {
              ...state,
              tasks: action.response,
              isTasksLoading: false,
              isTaskCreating: false,
            };
        case ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FAILED:
            return {
              ...state,
              tasks: null,
              errorTasks: "500: Internal server error, could not load tasks!",
              isTasksLoading: false,
              isTaskCreating: false,
            };
        case ASSIGNED_TASK_TYPES.ASSIGN_TASK_LOADING:
            return {
              ...state,
              errorTasks: null,
              isCreatingTask: true,
            };
        case ASSIGNED_TASK_TYPES.ASSIGN_TASK_SUCCESS:
            return {
              ...state,
              errorTasks: null,
              isCreatingTask: false,
            };
        case ASSIGNED_TASK_TYPES.ASSIGN_TASK_FAILED:
            return {
              ...state,
              errorTasks: "500: Internal server error, Could not assign task!",
              isCreatingTask: false,
            };
        default:
            return state;
    }
};

export const recievedTasksReducer = (state = INITIAL_TASKS_RECIEVED, action: actionType) => {
    switch (action.type) {
        case ASSIGNED_TASK_TYPES.RECIEVED_TASKS_LOADING:
            return {
                ...state,
                isTasksLoading: true,
                errorTasks: null
            }
        case ASSIGNED_TASK_TYPES.RECIEVED_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.response,
                isTasksLoading: false,
                errorTasks: null
            }
        case ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FAILED:
            return {
                ...state,
                errorTasks: "500: Internal server error, could not load tasks!",
                isTasksLoading: false
            }
        default:
            return state;
    }
};