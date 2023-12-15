import { call, put, takeEvery } from "redux-saga/effects";
import { USER_TYPES } from "./userTypes";

import { getUser, createUser, getAllUsers } from "./userService";
import { useNavigate } from "react-router-dom";
import { userPayloadType } from "./userActions";
import { allUsersResponseType } from "./userReducer";

type responseType = {
    token: Number
    userId: Number
    name: String
}

type users = {
  users: allUsersResponseType[]
}

//generator function to login user
// payload type has to be solved to be more specific
function* workGetUsersFetch({ payload }: { type: string; payload: userPayloadType }) {
  
  try {
    yield put({ type: USER_TYPES.GET_USERS_LOADING });
    const response: responseType = yield call(() => getUser(payload));
    if (!response.userId) {
      throw new Error("User Not Found");
    }
    yield put({
      type: USER_TYPES.GET_USERS_SUCCESS,
      response,
    });
  } catch (error) {
    yield put({ type: USER_TYPES.GET_USERS_FAILED });
  }
}

//generator function to create new user
// payload type has to be solved to be more specific
function* workCreateUserFetch({payload}: any) {
    
  try {
      yield put({ type: USER_TYPES.CREATE_USER_LOADING });
      console.log("payload from saga", payload);
      const response: responseType = yield call(() => createUser(payload));
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

function* workGetAllUsersFetch() {
  try {
    yield put({ type: USER_TYPES.GET_ALL_USERS_LOADING });
    const response: users = yield call(() =>
      getAllUsers()
    );
    console.log("response in saga", response.users);
    if (response.users) {
      yield put({ type: USER_TYPES.GET_ALL_USERS_SUCCESS, response: response.users });
    } else {
      yield put({ type: USER_TYPES.GET_ALL_USERS_FAILED, payload: response });
    }
  } catch (err) {
    yield put({ type: USER_TYPES.GET_ALL_USERS_FAILED, payload: err});
  }
}
 
function* userSaga() {
    yield takeEvery(USER_TYPES.GET_USERS_FETCH, workGetUsersFetch);
    yield takeEvery(USER_TYPES.CREATE_USER_FETCH, workCreateUserFetch);
  yield takeEvery(USER_TYPES.SIGN_OUT_FETCH, workSignOutUser);
  yield takeEvery(USER_TYPES.GET_ALL_USERS_FETCH, workGetAllUsersFetch);
}

export default userSaga;