import { combineReducers } from "redux";

import appReducer from "./app";
import statsReducer from "./stats";

const rootReducer = combineReducers({
    app: appReducer,
    stats: statsReducer
});

export default rootReducer;
