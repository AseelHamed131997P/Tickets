import { LOGOUT } from "actions/types";
import axios, { AxiosError } from "axios";
import config from "config";
import { general } from "data";
import { identity } from "lodash";

const api = axios.create({
  baseURL: config.api.endpoint,
});

api.interceptors.request.use((request) => {
  request.headers["x-access-token"] = localStorage.getItem("accessToken");
  return request;
});

api.interceptors.response.use(identity, (error: AxiosError) => {
  error.message = general.apiErrors.general;
  console.log("here in response");
  console.log(error.message);
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  console.log(message);

  if (
    message === "Unauthorized!" ||
    message === "session expired - update bisan config" ||
    message === "session expired , check bisan configuration" ||
    message === "Error while sending to bisan"
  ) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    dispatch({
      type: LOGOUT,
    });
  }
  return Promise.reject(error);
});

export default api;
function dispatch(arg0: { type: any }) {
  throw new Error("Function not implemented.");
}
