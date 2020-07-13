import { GET_ERRORS, CLEAR_ERRORS } from "../actions/Usertypes";

const InitialState = {
  msg: "",
  status: null,
  id: null,
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: "",
        status: null,
        id: null,
      };
    default:
      return {
        ...state,
      };
  }
}
