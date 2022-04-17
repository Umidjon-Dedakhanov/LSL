import axios from "axios";
const registration_services = axios.create({
  baseURL: "https://glacial-beyond-89151.herokuapp.com/payment"
});
export default registration_services;