import { all, call } from "redux-saga/effects";

import userSaga from './userSaga';
import tasksSaga from "./tasksSaga";
import assignedTasksSaga from './assignedTasksSaga';

export function* rootSaga() {
    yield all([
        call(userSaga),
        call(tasksSaga),
        call(assignedTasksSaga)
    ]);
}