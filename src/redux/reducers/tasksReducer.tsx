import { TASKS_TYPES } from "../types/tasksTypes";

export type tasksResponseType = {
  _id:String,
    title: String,
    description: String,
    priority: String,
    status: String,
  creator: String,
  createdAt: Date,
    updatedAt: Date
}

export type tasksState = {
    readonly tasks: tasksResponseType[] | null,
    readonly isTasksLoading: boolean,
    readonly errorTasks: String | null,
    readonly isCreatingTask: boolean
}

const INITIAL_TASKS = {
    tasks: [],
    isTasksLoading: false,
    errorTasks: null,
    isCreatingTask: false,
};

type actionType = {
    type: String,
    response?: tasksResponseType[]
}

export const tasksReducer = (state = INITIAL_TASKS, action: actionType) => {
    switch (action.type) {
      case TASKS_TYPES.GET_TASKS_LOADING:
        return {
          ...state,
          isTasksLoading: true,
          errorTasks: null,
        };
      case TASKS_TYPES.GET_TASKS_SUCCESS:
        return {
          ...state,
          tasks: action.response,
          isTasksLoading: false,
          isTaskCreating: false,
        };
      case TASKS_TYPES.GET_TASKS_FAILED:
        return {
          ...state,
          tasks: [],
          errorTasks: "500: Internal server error, could not load tasks!",
          isTasksLoading: false,
          isTaskCreating: false,
        };
      case TASKS_TYPES.CREATE_TASK_LOADING:
        return {
          ...state,
          errorTasks: null,
          isCreatingTask: true,
        };
      case TASKS_TYPES.CREATE_TASK_SUCCESS:
        return {
          ...state,
          errorTasks: null,
          isCreatingTask: false,
        };
      case TASKS_TYPES.CREATE_TASK_FAILED:
        return {
          ...state,
          errorTasks: "500: Internal server error, Could not create task!",
          isCreatingTask: false,
        };
      case TASKS_TYPES.EDIT_TASK_LOADING:
        return {
          ...state,
          errorTasks: null,
          isCreatingTask: true,
        };
      case TASKS_TYPES.EDIT_TASK_SUCCESS:
        return {
          ...state,
          errorTasks: null,
          isCreatingTask: false,
        };
      case TASKS_TYPES.EDIT_TASK_FAILED:
        return {
          ...state,
          errorTasks: "500: Internal server error, Could not edit task!",
          isCreatingTask: false,
        };
      default:
        return state;
    }
};