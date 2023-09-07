import axios, { AxiosRequestConfig } from "axios";
import { setCookie } from "./cookie";
// import { setCookie } from "@/util/cookies";

type LogInParams = {
  email: string;
  password: string;
};

export async function getUser({ email, password }: LogInParams) {
  setBaseUrl();
  const res = await getUserToken(email, password);

  const option: AxiosRequestConfig = {
    url: "/user",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res.data.token}`,
    },
    data: {
      email: email,
      password: password,
    },
  };

  setCookie("authToken", res.data.token);
  const user = await axios
    .request(option)
    .then((response) => response.data)
    .catch((error) => alert(error.message));
  return user;
}

export async function getUserToken(email: string, password: string) {
  console.log("start get token");
  const option: AxiosRequestConfig = {
    url: "/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: email,
      password: password,
    },
  };
  const response = await axios
    .request(option)
    .then((response) => {
      console.log("token get success");
      return response.data;
    })
    .catch((error) => {
      console.log("token fetch failed");
      return alert(error.message);
    });
  return response;
}

function setBaseUrl() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_WHEELYX_BACKEND_DEV_SERVER;
  // console.log("setBaseUrl");
}
