import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL,
});

api.interceptors.request.use(async (config: any) => {
  const session: any = await getSession();
  config.headers["AccessToken"] = session.accessToken;

  return config;
});

export default api;
