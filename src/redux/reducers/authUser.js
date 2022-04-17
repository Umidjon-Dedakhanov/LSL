const initialState = {
  userId: null
}

const authUserReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case "AUTH_USER_SUCCESS" :
      localStorage.setItem("user", JSON.stringify(payload));
      return{
        userId: payload.user._id
      }
    case "AUTH_USER_FAIL" :
        localStorage.removeItem("user");
        return{
          userId: null
        }
    default:
      return state
  }
}

export default authUserReducer;