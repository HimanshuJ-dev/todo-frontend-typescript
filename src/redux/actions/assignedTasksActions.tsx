import { ASSIGNED_TASK_TYPES } from "../types/assignedTasksTypes";

export const assignTaskFetch = (
    recieverEmail: String,
    taskname: String,
    description: String,
    priority: String,
    currentUser: String
) => ({
    type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_FETCH,
    payload: {recieverEmail, taskname, description, priority, currentUser}
})

export const assignedTasksFetch = (currentUser: String) => ({
    type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FETCH,
    payload: {currentUser}
})

export const markAssignedTaskCompletedFetch = (taskId: String, currentUser: String) => ({
    type: ASSIGNED_TASK_TYPES.MARK_ASSIGNED_TASK_COMPLETED_FETCH,
    payload: {taskId, currentUser}
})

export const markAssignedTaskCancelledFetch = (taskId: String, currentUser: String) => ({
    type: ASSIGNED_TASK_TYPES.MARK_ASSIGNED_TASK_CANCELLED_FETCH,
    payload: {taskId, currentUser}
})

export const editAssignedTaskFetch = (
    _id: String,
    recieverEmail: String,
    taskname: String,
    description: String,
    priority: String,
    currentUser: String
) => ({
    type: ASSIGNED_TASK_TYPES.EDIT_ASSIGNED_TASK_FETCH,
    payload: {_id, recieverEmail, taskname, description, priority, currentUser}
})

export const recievedTasksFetch = (currentUser: String) => ({
    type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FETCH,
    payload: {currentUser},
})