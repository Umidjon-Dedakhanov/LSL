import userLoginApi from '../../api/userAuth';
const USER_AUTH_ENDPOINT = "user/login"
const authUserSuccess = (userData) => {
  return {
    type: "AUTH_USER_SUCCESS",
    payload: userData
  }
}

const authUserFail = () => {
  return {
    type: "AUTH_USER_FAIL",
  }
}


const userLogin = (user__credentials) =>  async dispatch =>  {
  userLoginApi.post(USER_AUTH_ENDPOINT, user__credentials)
    .then(response => dispatch(authUserSuccess(response.data)))
    .catch(err => dispatch(authUserFail()))
}

export default userLogin;