export type ErrorFromServer = {
  code?: number;
  message?: string;
  config?: {
    withCredentials?: boolean;
  };
};
