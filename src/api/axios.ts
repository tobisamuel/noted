import axios from "axios";

const BASE_URL = "https://noted-app-api.herokuapp.com";

export default axios.create({ baseURL: BASE_URL, withCredentials: true });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
