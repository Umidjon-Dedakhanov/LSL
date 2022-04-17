import { AUTH_ADMIN_FAIL, AUTH_ADMIN_SUCCESS, AUTH_ADMIN_LOADING } from "./types";
import authAdminBaseURL from '../../api/adminAuth';
const ADMIN_ENDPOINT = "login";

export const authAdminSucces = (admin__data) => {
  return {
    type: AUTH_ADMIN_SUCCESS,
    payload: admin__data
  }
}

export const authAdminFail = (admin__data) => {
  return {
    type: AUTH_ADMIN_FAIL,
    payload: admin__data
  }
}

export const authAdminLoading = () => {
  return {
    type: AUTH_ADMIN_LOADING,
  }
}


const authorizeAdmin = (admin__credentials) => async dispatch => {
  dispatch(authAdminLoading());
  authAdminBaseURL.post(ADMIN_ENDPOINT, admin__credentials)
    .then(response => {
      dispatch(authAdminSucces(response.data))
    })
    .catch(err => {
      dispatch(authAdminFail(err.response.data.message))
    })
} 

export default authorizeAdmin;