import axios from "axios";
import { DOMAIN, TOKEN_CYBERSOFT } from "./internalVariable";
import { getCookie } from "./method/method";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
});

http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: getCookie("accessToken"),
    TokenCybersoft: TOKEN_CYBERSOFT,
  };
  return req;
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);
