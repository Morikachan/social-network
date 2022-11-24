import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";

const combinedReducers = combineReducers({
  userReducer,
});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
