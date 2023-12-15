import { TASKS_TYPES } from "./tasksTypes";

export const getTasksFetch = (currentUser: String) => ({
    type: TASKS_TYPES.GET_TASKS_FETCH,
    payload: currentUser
})

export const createTasksFetch = (taskname: String, description: String, priority: String, currentUser: String) => ({
    type: TASKS_TYPES.CREATE_TASK_FETCH,
    payload: {taskname, description, priority, currentUser}
})

export const editTaskFetch = (
  _id: String,
  taskname: String,
  description: String,
  priority: String,
  currentUser: String
) => ({
  type: TASKS_TYPES.EDIT_TASK_FETCH,
    payload: { _id, taskname, description, priority, currentUser },
});

export const deleteTaskFetch = (taskId: String, currentUser: String) => ({
    type: TASKS_TYPES.DELETE_TASK_FETCH,
    payload: {taskId, currentUser}
})

export const markTaskCompletedFetch = (taskId: String, currentUser: String) => ({
    type: TASKS_TYPES.MARK_TASK_COMPLETED_FETCH,
    payload: {taskId, currentUser}
})

export const markTaskCancelledFetch = (taskId: String, currentUser: String) => ({
    type: TASKS_TYPES.MARK_TASK_CANCELLED_FETCH,
    payload: {taskId, currentUser}
})