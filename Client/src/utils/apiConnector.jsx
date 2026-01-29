import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true, // IMPORTANT: cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiConnector = ({
  method,
  url,
  data = null,
  params = null,
  headers = {},
}) => {
  return axiosInstance({
    method,
    url,
    data,
    params,
    headers,
  });
};
