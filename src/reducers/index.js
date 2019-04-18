import postsReducer from "./posts";
import profilesReducer from "./profiles";
import signInReducer from "./signin";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  postsReducer,
  profilesReducer,
  signInReducer
});

export default rootReducer;
