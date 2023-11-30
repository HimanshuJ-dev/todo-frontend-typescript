import { USER_TYPES } from "../types/userTypes";

type userResponseType = { token: Number; userId: Number; name: String };

export type UserState = {
  readonly response: userResponseType | null;
  readonly isLoggingIn: boolean;
  readonly errorUser: String | null;
  readonly isSigningOut: boolean;  
}

const INITIAL_STATE = {
  response: null,
  isLoggingIn: false,
  errorUser: null,
  isSigningOut: false,
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
        errorUser: null
          };
      case USER_TYPES.SIGN_OUT_SUCCESS:
          return {
              ...state,
              response: null,
              errorUser: null,
              isSigningOut: false,
          }
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
              errorUser: null
          }
      case USER_TYPES.CREATE_USER_SUCCESS:
          return {
              ...state,
              response: action.response,
              isLoggingIn: false,
              errorUser: null,
          }
      case USER_TYPES.CREATE_USER_FAILED:
          return {
              ...state,
              response: null,
              errorUser: "500: Internal Server Error, Could not Create User",
            isLoggingIn: false,
          };
    default:
      return state;
  }
};
