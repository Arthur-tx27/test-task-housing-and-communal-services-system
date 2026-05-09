/// <reference types="vite/client" />

/* eslint-disable no-var */
declare var process: {
  env: {
    SHOWROOM_API_URL?: string;
    [key: string]: string | undefined;
  };
};
