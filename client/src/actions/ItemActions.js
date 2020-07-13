import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./ItemTypes";
import axios from "axios";
const NULL = "NULL";

export const getItems = () => (dispatch) => {
  // return {
  //   type: GET_ITEMS,
  // };

  dispatch(setItemsLoading());

  axios.get("/api/items").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addItem = (item) => (dispatch) => {
  // return {
  //   type: ADD_ITEM,
  //   payload: item,
  // };

  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};

export const deleteItem = (_id) => (dispatch) => {
  // return {
  //   type: DELETE_ITEM,
  //   payload: _id,
  // };

  axios.delete(`/api/items/${_id}`).then((res) => {
    if (res.data.msg === "success") {
      return dispatch({
        type: DELETE_ITEM,
        payload: _id,
      });
    }
    return dispatch({
      type: NULL,
    });
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
