import { call, put, takeEvery } from "redux-saga/effects";
import { USER_TYPES } from "../types/userTypes";

import { getUser, createUser } from "../service/userService";
import { payloadType } from "../actions/userActions";

type responseType = {
    token: Number
    userId: Number
    name: String
}

//generator function to login user
// payload type has to be solved to be more specific
function* workGetUsersFetch(payload: any) {
    yield put({ type: USER_TYPES.GET_USERS_LOADING });
    const response: responseType = yield call(() => getUser(payload))
    try {
        if (!response.userId) {
            throw new Error("User Not Found");
        }
        yield put({
            type: USER_TYPES.GET_USERS_SUCCESS,
            response,
        })
    }
    catch (error) {
        yield put({type: USER_TYPES.GET_USERS_FAILED})
    }
}

//generator function to create new user
// payload type has to be solved to be more specific
function* workCreateUserFetch(payload: any) {
    yield put({ type: USER_TYPES.CREATE_USER_LOADING });
    const response: responseType = yield call(() => createUser(payload));
    try {
        if (!response.userId) {
            throw new Error("User not created");
        }
        yield put({
            type: USER_TYPES.GET_USERS_SUCCESS,
            response,
        })
    }
    catch (error) {
        yield put({ type: USER_TYPES.CREATE_USER_FAILED });
    }
}

//generator function for signing out
//add the fucntions to reset all other reducers while logging out
function* workSignOutUser() {
    yield put({
        type: USER_TYPES.SIGN_OUT_SUCCESS
    })
}

function* userSaga() {
    yield takeEvery(USER_TYPES.GET_USERS_FETCH, workGetUsersFetch);
    yield takeEvery(USER_TYPES.CREATE_USER_FETCH, workCreateUserFetch);
    yield takeEvery(USER_TYPES.SIGN_OUT_FETCH, workSignOutUser);
}

export default userSaga;