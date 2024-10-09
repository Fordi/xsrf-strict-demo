export const CLIENT_ROOT = new URL("../../client", import.meta.url).pathname;
export const REFERRER_WHITELIST = [
  'api.local.host',
  'client.local.host',
];
export const SERVER_ROOT = new URL("../../server", import.meta.url).pathname;