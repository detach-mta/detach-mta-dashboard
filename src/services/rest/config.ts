import { CLIENT } from "@/utils/constants";
import type { AxiosRequestConfig } from "axios";

export const configCredit: AxiosRequestConfig = {
  headers: {
    "Access-Control-Allow-Origin": CLIENT,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
};
