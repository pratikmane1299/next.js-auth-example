import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL,
});

export default api;
