import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  Items: ItemReducer,
  Auth: AuthReducer,
  Error: ErrorReducer,
});
