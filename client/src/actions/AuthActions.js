import {
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
} from "./Usertypes";
import axios from "axios";
import { getErrors } from "../actions/ErrorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  // const token = getState().Auth.token;

  // const config = {
  //   header: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // if (token) {
  //   config.header["X-Auth-Key"] = token;
  // }

  axios
    .get("/api/register", getConfig(getState))
    .then((user) => {
      dispatch({
        type: USER_LOADED,
        payload: user,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

export const getConfig = (getState) => {
  const token = getState().Auth.token;

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.header["X-Auth-Key"] = token;
  }
  return config;
};

export const registerUser = ({ name, email, password }) => (dispatch) => {
  const configHeader = {
    "Content-Type": "application/json",
  };

  const reqBody = {
    name,
    email,
    password,
  };

  // const reqBody_JSON = JSON.stringify(reqBody);

  axios
    .post("/api/register", reqBody, configHeader)
    .then((newUser) => {
      // console.log(newUser.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: newUser.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch(
        getErrors(err.response.data, err.response.status, REGISTER_FAIL)
      );
    });
};

export const login = ({ email, password }) => (dispatch) => {
  const reqBody = {
    email,
    password,
  };
  const reqHead = {
    "Content-Type": "application/json",
  };
  axios
    .post("/api/login", reqBody, reqHead)
    .then((resUser) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: resUser.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch(getErrors(err.response.data, err.response.status, LOGIN_FAIL));
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
