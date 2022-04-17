import { combineReducers } from "redux";
import authAdminReducer from "./authAdmin";
import authUserReducer from './authUser';

const rootReducer = combineReducers({
  admin: authAdminReducer,
  user: authUserReducer
})

export default rootReducer