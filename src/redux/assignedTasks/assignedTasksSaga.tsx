import { call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";
import { ASSIGNED_TASK_TYPES } from "./assignedTasksTypes";
import { assignTask, assignedTasks, cancelAssignedTask, completeAssignedTask, deleteAssignedTask, editAssignedTask, recivedTasks } from "./assignedTasksService";
import { useNavigate } from "react-router-dom";
import { tasksResponseType } from "../tasks/tasksReducer";

type getAssignedTasksResponseType = {
  tasks?: tasksResponseType[];
  message?: String;
};

function* workAssignTaskFetch({payload}: any) {
    
  try {
      yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_LOADING });
      const response: getAssignedTasksResponseType = yield call(() =>
        assignTask(payload)
      );
        if (response.message !== "task created") {
            throw new Error("Could not assign task");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_SUCCESS });
        swal("Task assigned successfully!");
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_FAILED });
        swal("Some error occured\nCould not assign task");
    }
}

function* workAssignedTasksFetch({payload}: any) {
 
  try {
       yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_LOADING });
       const response: getAssignedTasksResponseType = yield call(() =>
         assignedTasks(payload)
       );
        if (!response.tasks) {
            throw new Error("Could not load tasks");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_SUCCESS, response: response.tasks });
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FAILED, response: error })
        swal("Some error occured\nCould not load tasks");
    }
}

function* workCompleteAssignedTaskFetch({payload}: any) {
    
  try {
      const response: getAssignedTasksResponseType = yield call(() =>
        completeAssignedTask(payload)
      );
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

function* workCancelAssignedTaskFetch({payload}: any) {
    
  try {
      const response: getAssignedTasksResponseType = yield call(() =>
        cancelAssignedTask(payload)
      );
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

function* workDeleteAssignedTaskFetch({ payload }: any) {
  
  
  try {
    const response: getAssignedTasksResponseType = yield call(() =>
      deleteAssignedTask(payload)
    );
    if (response.message !== "task deleted") {
      throw new Error("Could not delete task");
    }
    swal("Task Deleted Successfully");
    yield put({
      type: ASSIGNED_TASK_TYPES.ASSIGNED_TASKS_FETCH,
      payload: payload,
    });
    yield put({
      type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_FETCH,
      payload: payload,
    });
  } catch (error) {
    swal("Some Error Occured\nCould not delete task");
  }
}

function* workEditAssignedTaskFetch({ payload }: any) {
    
  try {
      console.log("payload from saga:", payload);
      yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_LOADING });
      const response: getAssignedTasksResponseType = yield call(() =>
        editAssignedTask(payload)
      );
        if (response.message !== "task updated") {
            throw new Error("Could not edit task");
        }
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_SUCCESS })
        swal("Assignment Updated Successfully");
    } catch (error) {
        yield put({ type: ASSIGNED_TASK_TYPES.ASSIGN_TASK_FAILED })
        swal("Some error occured\nCould not edit task");
    }
}

function* workRecievedTasksFetch({payload}: any) {
    
  try {
      yield put({ type: ASSIGNED_TASK_TYPES.RECIEVED_TASKS_LOADING });
      const response: getAssignedTasksResponseType = yield call(() =>
        recivedTasks(payload)
      );
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
    yield takeEvery(ASSIGNED_TASK_TYPES.DELETE_ASSIGNED_TASK_FETCH, workDeleteAssignedTaskFetch);
}

export default assignedTasksSaga;