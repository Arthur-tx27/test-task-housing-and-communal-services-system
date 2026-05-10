/// <reference types="vite/client" />

/* eslint-disable no-var */
declare var process: {
  env: {
    VITE_API_BASE_URL?: string;
    [key: string]: string | undefined;
  };
};
