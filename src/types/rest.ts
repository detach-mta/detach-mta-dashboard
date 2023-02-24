import type { ErrorFromServer } from "./error";
import type { LogMail, LogMetric } from "./data";

export type LogMailResponse = {
  response: { metrics: LogMetric; mails: LogMail[] };
  error: ErrorFromServer | null;
};

export type LogStatResponse = {
  response: LogMetric;
  error: ErrorFromServer | null;
};
