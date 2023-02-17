import axios from "axios";
import type { LogMailResponse } from "@/types/rest";
import { API } from "@/utils/constants";
import Logger from "@/utils/logger";

import { configCredit } from "@/services/rest/config";

const logClassName = "Service-Rest-Geo";

/**
 * retrieve the list of mail
 */
async function fetchMailLog(userMail: string): Promise<LogMailResponse> {
  Logger.info(logClassName, "Fetching.", "fetchMailLog");
  const body = { sender: userMail };
  const config = configCredit;
  try {
    const apiResponse = (await axios.post(`${API}/mails`, body, config)).data;
    return { response: apiResponse, error: null };
  } catch (e: any) {
    Logger.error(logClassName, JSON.stringify(e), "fetchMailLog");
    return {
      response: [],
      error: e,
    };
  }
}

export { fetchMailLog };
