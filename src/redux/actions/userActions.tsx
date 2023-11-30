import { USER_TYPES } from "../types/userTypes"

export type payloadType = {
    name?: String,
    email: String,
    password: String
}

export const getUsersFetch = (payload: payloadType) => ({
    type: USER_TYPES.GET_USERS_FETCH,
    payload: {...payload}
});

export const createUserFetch = (payload: payloadType) => ({
    type: USER_TYPES.CREATE_USER_FETCH,
    payload: {...payload}
});

export const signOutUser = () => ({
    type: USER_TYPES.SIGN_OUT_FETCH
});