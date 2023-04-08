import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { notesReducer } from "./notes/notesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ notesReducer });

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
