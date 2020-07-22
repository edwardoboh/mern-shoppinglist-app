import { getConfig } from "./AuthActions";
import { getErrors } from "./ErrorActions";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./ItemTypes";
import axios from "axios";
const NULL = "NULL";

export const getItems = () => (dispatch) => {
  // return {
  //   type: GET_ITEMS,
  // };

  dispatch(setItemsLoading());

  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  // return {
  //   type: ADD_ITEM,
  //   payload: item,
  // };

  axios
    .post("/api/items", item, getConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (_id) => (dispatch, getState) => {
  // return {
  //   type: DELETE_ITEM,
  //   payload: _id,
  // };

  axios
    .delete(`/api/items/${_id}`, getConfig(getState))
    .then((res) => {
      if (res.data.msg === "Delete Success") {
        return dispatch({
          type: DELETE_ITEM,
          payload: _id,
        });
      }
      return dispatch({
        type: NULL,
      });
    })
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
