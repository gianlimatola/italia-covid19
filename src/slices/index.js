import { combineReducers } from "redux";

import statsReducer from "./stats";

const rootReducer = combineReducers({
    stats: statsReducer,
});

export default rootReducer;
