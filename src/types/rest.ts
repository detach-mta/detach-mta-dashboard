import type { ErrorFromServer } from "./error";
import type { LogMail } from "./data";

export type LogMailResponse = {
  response: LogMail[];
  error: ErrorFromServer | null;
};
