import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";
import { getDateString } from "@/util/dateUtil";

type RankingFetchProps = {
  start: string;
  end: string;
  type: 0 | 1;
};

export async function getAllTypeRankingByDate(date: Date) {
  await setBaseUrl();
  const token = getCookie("authToken");
  token !== null ? console.log("successed to fetch token") : null;
  const start = getDateString(date, "start");
  const end = getDateString(date, "end");

  const option: AxiosRequestConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  option.url = `/ranking/range?start=${start}&end=${end}`;

  const response = await axios
    .request(option)
    .then((res) => res.data)
    .catch((error) => alert(error.message));
  return response.data;
}

export async function getHistoryRankingByDateAndType(
  start: Date,
  end: Date,
  type: 0 | 1
) {
  await setBaseUrl();
  const token = getCookie("authToken");
  token !== null ? console.log("successed to fetch token") : null;
  const startString = getDateString(start, "start");
  const endString = getDateString(end, "end");

  const option: AxiosRequestConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  option.url = `/ranking/all-range/type?start=${startString}&end=${endString}&type=${type}`;

  const response = await axios
    .request(option)
    .then((res) => res.data)
    .catch((error) => alert(error.message));

  return response.data;
}

function setBaseUrl() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_WHEELYX_BACKEND_DEV_SERVER;
}
