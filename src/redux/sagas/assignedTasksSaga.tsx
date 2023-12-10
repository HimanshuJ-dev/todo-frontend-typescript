import { call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";
import { ASSIGNED_TASK_TYPES } from "../types/assignedTasksTypes";
import { assignTask, assignedTasks, cancelAssignedTask, completeAssignedTask, editAssignedTask, recivedTasks } from "../service/assignedTasksService";
import { useNavigate } from "react-router-dom";
import { tasksResponseType } from "../reducers/tasksReducer";

type getAssignedTasksResponseType = {
  tasks?: tasksResponseType[];
  message?: String;
};

function* workAssignTaskFetch({payload}: any) {
    console.log("payload from saga:", payload)
    yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_LOADING });
    const response: getAssignedTasksResponseType = yield call(() => assignTask(payload));
    try {
        if (response.message !== "task created") {
            throw new Error("Could not assign task");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_SUCCESS });
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_FAILED });
        swal("Some error occured\nCould not assign task");
    }
}

function* workAssignedTasksFetch({payload}: any) {
    console.log("payload from saga:", payload);
    const response: getAssignedTasksResponseType = yield call(() => assignedTasks(payload));
    try {
        if (!response.tasks) {
            throw new Error("Could not load tasks");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_SUCCESS, response: response.tasks });
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FAILED, response: error })
        swal("Some error occured\nCould not load tasks");
    }
}

function* workCompleteAssignedTaskFetch(payload: any) {
    const response: getAssignedTasksResponseType = yield call(() => completeAssignedTask(payload));
    try {
        if (response.message !== "task updated") {
            throw new Error("Could not updated task");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FETCH, payload: payload });
        yield put({ type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FETCH, payload: payload });
        swal("Task Completed");
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FAILED })
        swal("Some error occured\nCould not update Task");
    }
}

function* workCancelAssignedTaskFetch(payload: any) {
    const response: getAssignedTasksResponseType = yield call(() =>
      cancelAssignedTask(payload)
    );
    try {
      if (response.message !== "task updated") {
        throw new Error("Could not updated task");
      }
      yield put({
        type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FETCH,
        payload: payload,
      });
      yield put({
        type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FETCH,
        payload: payload,
      });
      swal("Task Cancelled");
    } catch (error) {
      yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FAILED });
      swal("Some error occured\nCould not update Task");
    }
}

function* workEditAssignedTaskFetch(payload: any) {
    yield put({type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_LOADING})
    const response: getAssignedTasksResponseType = yield call(() => editAssignedTask({ ...payload }))
    try {
        if (response.message !== "task updated") {
            throw new Error("Could not edit task");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_SUCCESS })
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_FAILED })
        swal("Some error occured\nCould not edit task");
    }
}

function* workRecievedTasksFetch({payload}: any) {
    yield put({type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_LOADING})
    const response: getAssignedTasksResponseType = yield call(() => recivedTasks(payload));
    try {
        if (!response.tasks) {
            throw new Error("Could not load Tasks");
        }
        yield put({type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_SUCCESS, response: response.tasks})
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FAILED });
        swal("Some error occured\nCould not load Tasks");
    }
}

function* assignedTasksSaga() {
    yield takeEvery(ASSIGNED_TASK_TYPES.ASSIGN_TASK_FETCH, workAssignTaskFetch);
    yield takeEvery(ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FETCH, workAssignedTasksFetch);
    yield takeEvery(ASSIGNED_TASK_TYPES.MARK_ASSIGNED_TASK_COMPLETED_FETCH, workCompleteAssignedTaskFetch);
    yield takeEvery(ASSIGNED_TASK_TYPES.MARK_ASSIGNED_TASK_CANCELLED_FETCH, workCancelAssignedTaskFetch);
    yield takeEvery(ASSIGNED_TASK_TYPES.EDIT_ASSIGNED_TASK_FETCH, workEditAssignedTaskFetch);
    yield takeEvery(ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FETCH, workRecievedTasksFetch);
}

export default assignedTasksSaga;