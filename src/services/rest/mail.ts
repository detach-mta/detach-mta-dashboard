import axios from "axios";
import type { LogMailResponse, LogStatResponse } from "@/types/rest";
import { API, DEFAULT_METRIC } from "@/utils/constants";
import Logger from "@/utils/logger";

import { configHeader } from "@/services/rest/config";

const logClassName = "Service-Rest-Geo";

/**
 * retrieve the list of mail
 */
export async function fetchMailLog(userMail: string): Promise<LogMailResponse> {
  Logger.info(logClassName, `Fetching with ${userMail}.`, "fetchMailLog");
  const body = { sender: userMail };
  const config = configHeader;

  try {
    const apiResponse = (await axios.post(`${API}/mails`, body, config)).data;
    return { response: apiResponse, error: null };
  } catch (e: any) {
    Logger.error(logClassName, JSON.stringify(e), "fetchMailLog");
    return {
      response: { metrics: DEFAULT_METRIC, mails: [] },
      error: e,
    };
  }
}

/**
 * retrieve the stats of saved from the whole server
 */
export async function fetchMailStats(): Promise<LogStatResponse> {
  Logger.info(logClassName, `Fetching stats from server.`, "fetchMailStats");
  const config = configHeader;

  try {
    const apiResponse = (await axios.get(`${API}/mails`, config)).data;
    return { response: apiResponse, error: null };
  } catch (e: any) {
    Logger.error(logClassName, JSON.stringify(e), "fetchMailStats");
    return {
      response: DEFAULT_METRIC,
      error: e,
    };
  }
}
