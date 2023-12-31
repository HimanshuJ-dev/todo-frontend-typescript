import { call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";
import { TASKS_TYPES } from "./tasksTypes";
import { cancelTask, completeTask, createTask, deleteTask, editTask, getTasks } from "./tasksService";
import { tasksResponseType } from "./tasksReducer";
import { useNavigate } from "react-router-dom";

type getTasksResponseType = {
    tasks?: tasksResponseType[],
    message?: String
}

function* workGetTasksFetch({ payload }: any) {
    
    try {
        console.log("payload from saga:", payload);
        yield put({ type: TASKS_TYPES.GET_TASKS_LOADING });
        const response: getTasksResponseType = yield call(() =>
          getTasks(payload)
        );
        if (!response.tasks) {
            throw new Error("Could not load tasks");
        }
        yield put({ type: TASKS_TYPES.GET_TASKS_SUCCESS, response: response.tasks || [] });
    }
    catch (error) {
        yield put({ type: TASKS_TYPES.GET_TASKS_FAILED })
        swal("Some error occured\nCould not load Tasks");
    }
}

function* workCreateTaskFetch({payload}: any) {
    
    try {
        console.log("payload form saga", payload);
        yield put({ type: TASKS_TYPES.CREATE_TASK_LOADING });
        const response: getTasksResponseType = yield call(() =>
          createTask(payload)
        );
        console.log("response form saga", response);
        if (response.message !== "task created") {
            throw new Error("Could not create task");
        }
        yield put({ type: TASKS_TYPES.CREATE_TASK_SUCCESS });
        swal("task created");
    } catch (error) {
        yield put({ type: TASKS_TYPES.CREATE_TASK_FAILED });
        swal("Some error occured\nCould not create task");
    }
}

function* workDeleteTaskFetch({payload}: any) {
    
    try {
        console.log("payload from saga:", payload);
        const response: getTasksResponseType = yield call(() =>
          deleteTask(payload)
        );
        if (response.message !== "task deleted") {
            throw new Error("Could not delete task");
        }
        swal('Task Deleted Successfully');
        yield put({ type: TASKS_TYPES.GET_TASKS_FETCH, payload: payload.currentUser});
    } catch (error) {
        swal("Some Error Occured\nCould not delete task");
    }
}

function* workEditTaskFetch({payload}: any) {
    
    try {
        yield put({ type: TASKS_TYPES.EDIT_TASK_LOADING });
        const response: getTasksResponseType = yield call(() =>
          editTask(payload)
        );
        if (response.message !== "task updated") {
            throw new Error("Could not update task");
        }
        swal("Task updated successfully");
        yield put({ type: TASKS_TYPES.EDIT_TASK_SUCCESS });
    } catch (error) {
        swal("Some Error Occured\nCould not update task");
        yield put({ type: TASKS_TYPES.EDIT_TASK_FAILED });
    }
}

function* workCompleteTaskFetch({payload}: any) {
    
    try {
        const response: getTasksResponseType = yield call(() =>
          completeTask(payload)
        );
        if (response.message !== "task updated") {
            throw new Error("Could not update task");
        }
        swal('Task updated successfully');
        yield put({ type: TASKS_TYPES.GET_TASKS_FETCH, payload: payload.currentUser });
    } catch (error) {
        swal("Some Error Occured\nCould not updated Task");
    }
}

function* workCancelTaskFetch({payload}: any) {
  
    try {
      const response: getTasksResponseType = yield call(() =>
        cancelTask(payload)
      );
    if (response.message !== "task updated") {
      throw new Error("Could not update task");
    }
    swal("Task updated successfully");
    yield put({ type: TASKS_TYPES.GET_TASKS_FETCH, payload: payload.currentUser });
  } catch (error) {
    swal("Some Error Occured\nCould not updated Task");
  }
}

function* tasksSaga() {
    yield takeEvery(TASKS_TYPES.GET_TASKS_FETCH, workGetTasksFetch);
    yield takeEvery(TASKS_TYPES.CREATE_TASK_FETCH, workCreateTaskFetch);
    yield takeEvery(TASKS_TYPES.DELETE_TASK_FETCH, workDeleteTaskFetch);
    yield takeEvery(TASKS_TYPES.EDIT_TASK_FETCH, workEditTaskFetch);
    yield takeEvery(TASKS_TYPES.MARK_TASK_COMPLETED_FETCH, workCompleteTaskFetch);
    yield takeEvery(TASKS_TYPES.MARK_TASK_CANCELLED_FETCH, workCancelTaskFetch);
}

export default tasksSaga;
