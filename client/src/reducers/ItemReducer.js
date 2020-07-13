import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/ItemTypes";
// import { v4 as uuid } from "uuid";

const InitialState = {
  items: [
    // {
    //   _id: uuid(),
    //   name: "Apple",
    // },
    // {
    //   _id: uuid(),
    //   name: "Mango",
    // },
    // {
    //   _id: uuid(),
    //   name: "Pear",
    // },
  ],
  loading: false,
};

function itemReducer(state = InitialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
}

export default itemReducer;
