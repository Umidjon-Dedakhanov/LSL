import axios from "axios"
const createTest = axios.create({
  baseURL: "https://glacial-beyond-89151.herokuapp.com/"
});
export default createTest;