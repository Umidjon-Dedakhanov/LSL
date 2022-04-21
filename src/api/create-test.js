import axios from "axios"
const createTest = axios.create({
  baseURL: "http://localhost:8000/"
});
export default createTest;