
import { combineReducers } from "redux";
import credentials from './credentials-reducer'
import calendar from './calendar-reducer';


const rootReducer = combineReducers ({
    credentials,
    calendar,
});

export default rootReducer;