import type { ErrorFromServer } from "./error";
import type { LogMail, LogMetric } from "./data";

export type LogMailResponse = {
  response: { metrics: LogMetric; mails: LogMail[] };
  error: ErrorFromServer | null;
};
