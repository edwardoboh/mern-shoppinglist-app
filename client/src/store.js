import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/";
import thunk from "redux-thunk";

const InitialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  InitialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
