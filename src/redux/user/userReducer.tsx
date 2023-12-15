import { Data } from "../../components/AllUsers/AllUsers";
import { USER_TYPES } from "./userTypes";

type userResponseType = { token: String; userId: String; name: String };

export type allUsersResponseType = { name: String; email: String };

export type UserState = {
  readonly response: userResponseType | null;
  readonly isLoggingIn: boolean;
  readonly errorUser: String | null;
  readonly isSigningOut: boolean;  
  readonly darkmode: String;
  readonly users: Data[] | [];
  readonly isUsersLoading: boolean;
  readonly userLoadingError: String | null;
}

export type userRootState = {
  user: UserState;
};

const INITIAL_STATE = {
  response: null,
  isLoggingIn: false,
  errorUser: null,
  isSigningOut: false,
  darkmode: "light",
  users: [],
  isUsersLoading: false,
  userLoadingError: null
};

type actionType = {
  type: String,
  response?: userResponseType
}

// try to add a actions type for action parameter
export const userReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case USER_TYPES.GET_USERS_LOADING:
      return {
        ...state,
        errorUser: null,
        isLoggingIn: true,
      };
    case USER_TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        response: action.response,
        errorUser: null,
        isLoggingIn: false,
      };
    case USER_TYPES.GET_USERS_FAILED:
      return {
        ...state,
        response: null,
        errorUser: "500: Internal Server Error, Could not Sign In",
        isLoggingIn: false,
      };
    case USER_TYPES.SIGN_OUT_LOADING:
      return {
        ...state,
        isSigningOut: true,
        errorUser: null,
      };
    case USER_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        response: null,
        errorUser: null,
        isSigningOut: false,
      };
    case USER_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        errorUser: "500: Internal Server Error, Could not Sign Out",
        isSigningOut: false,
      };
    case USER_TYPES.CREATE_USER_LOADING:
      return {
        ...state,
        isLoggingIn: true,
        errorUser: null,
      };
    case USER_TYPES.CREATE_USER_SUCCESS:
      return {
        ...state,
        response: action.response,
        isLoggingIn: false,
        errorUser: null,
      };
    case USER_TYPES.CREATE_USER_FAILED:
      return {
        ...state,
        response: null,
        errorUser: "500: Internal Server Error, Could not Create User",
        isLoggingIn: false,
      };
    case USER_TYPES.TURN_DARK_MODE_ON:
      return {
        ...state,
        darkmode: "dark",
      };
    case USER_TYPES.TURN_LIGHT_MODE_ON:
      return {
        ...state,
        darkmode: "light",
      };
    case USER_TYPES.GET_ALL_USERS_LOADING:
      return {
        ...state,
        userLoadingError: null,
        isUsersLoading: true
      };
    case USER_TYPES.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.response,
        userLoadingError: null,
        isUsersLoading: false,
      };
    case USER_TYPES.GET_ALL_USERS_FAILED:
      return {
        ...state,
        userLoadingError: "500: Internal Server Error, Could not Get Users",
        users: [],
        isUsersLoading: false,
      };
    default:
      return state;
  }
};
