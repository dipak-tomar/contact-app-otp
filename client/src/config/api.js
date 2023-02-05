import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://contact-app-otp-api.onrender.com/api",
});

export default axios;
