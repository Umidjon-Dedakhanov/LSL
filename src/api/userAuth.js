import axios from "axios";
const userLogin = axios.create({
  baseURL: "https://glacial-beyond-89151.herokuapp.com/"
});
export default userLogin;