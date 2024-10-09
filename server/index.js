import http from "node:http";
import { existsSync as exists } from "node:fs";
import { REFERRER_WHITELIST } from "./utils/consts.js";


const server = http.createServer(async (req, res) => {
  if (req.headers.referer && REFERRER_WHITELIST.includes(new URL(req.headers.referer).hostname)) {
    res.setHeader("access-control-allow-origin", req.headers.referer.replace(/\/$/, ''));
    res.setHeader("access-control-allow-credentials", true);
    res.setHeader("vary", "Origin");
  }
  const host = req.headers.host.replace(/:\d+$/, '');
  let script = new URL(`${host}${req.url}.js`, import.meta.url).pathname;
  if (!exists(script)) {
    script = new URL(`${host}/index.js`, import.meta.url).pathname;
  }
  if (!exists(script)) {
    script = new URL(`404.js`, import.meta.url).pathname;
  }
  const module = await import(script);
  return module[req.method] ?? module.default(req, res);
});

server.listen(8080, 'localhost', () => {
  console.log("Running");
});