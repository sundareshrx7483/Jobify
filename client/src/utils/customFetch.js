import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // send cookies with requests
});

export default api;
