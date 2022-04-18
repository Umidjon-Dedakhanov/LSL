import userLoginApi from '../../api/userAuth';
const USER_AUTH_ENDPOINT = "user/login"
const authUserSuccess = (userData) => {
  return {
    type: "AUTH_USER_SUCCESS",
    payload: userData
  }
}

const authUserFail = (code) => {
  return {
    type: "AUTH_USER_FAIL",
    payload: {
      code
    }
  }
}


const userLogin = (user__credentials) =>  async dispatch =>  {
  userLoginApi.post(USER_AUTH_ENDPOINT, user__credentials)
    .then(response => dispatch(authUserSuccess(response.data)))
    .catch(err => {
      dispatch(authUserFail(err.response.status))
    })
}

export default userLogin;