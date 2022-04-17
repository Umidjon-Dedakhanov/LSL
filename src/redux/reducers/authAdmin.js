import { AUTH_ADMIN_FAIL, AUTH_ADMIN_SUCCESS, AUTH_ADMIN_LOADING } from "../actions/types";

const initialState = {
  admin: null,
  loading: false,
  isAuthenticated: false,
  message: ''
}

const authAdminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case AUTH_ADMIN_SUCCESS:
      localStorage.setItem("admin", payload.token);
      return {
        admin: payload.user,
        loading: false,
        isAuthenticated: true,
        message: payload.message
      }
    case AUTH_ADMIN_FAIL:
      localStorage.removeItem("admin", payload.token);
        return {
          admin: null,
          loading: false,
          isAuthenticated: false,
          message: payload.message
        }

    case AUTH_ADMIN_LOADING:
        return {
          admin: null,
          loading: true,
          isAuthenticated: false,
          message: "Loading..."
    }
      default: 
        return state
  }
}

export default authAdminReducer;