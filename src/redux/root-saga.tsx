import { all, call } from "redux-saga/effects";

import userSaga from './user/userSaga';
import tasksSaga from "./tasks/tasksSaga";
import assignedTasksSaga from './assignedTasks/assignedTasksSaga';

export function* rootSaga() {
    yield all([
        call(userSaga),
        call(tasksSaga),
        call(assignedTasksSaga)
    ]);
}