import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/Usertypes";

const InitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        // user: action.payload.user,
        // token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      // localStorage.removeItem("token");
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {},
      };
    default:
      return {
        ...state,
      };
  }
}
