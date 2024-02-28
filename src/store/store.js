import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
