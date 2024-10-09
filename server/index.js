import http from "node:http";
import { existsSync as exists } from "node:fs";
import { join } from "node:path";
import { REFERRER_WHITELIST, SERVER_ROOT } from "./utils/consts.js";

const getHandler = async (script, method) => {
  if (!exists(script)) return false;
  const module = await import(script);
  return module[method] ?? module.default;
};

const server = http.createServer(async (req, res) => {
  if (req.headers.referer && REFERRER_WHITELIST.includes(new URL(req.headers.referer).hostname)) {
    res.setHeader("access-control-allow-origin", req.headers.referer.replace(/\/$/, ''));
    res.setHeader("access-control-allow-credentials", true);
    res.setHeader("vary", "Origin");
  }
  const host = req.headers.host.replace(/:\d+$/, '');
  const method = req.method.toLowerCase();
  let path = req.url.replace(/^\//, '');
  if (path.endsWith('/') || path === '') {
    path += 'index';
  }
  let handler = await getHandler(join(SERVER_ROOT, host, `${path}.js`), method);
  if (!handler) {
    handler = await getHandler(join(SERVER_ROOT, '404.js'), method);
  }
  return handler(req, res);
});

server.listen(8080, 'localhost', () => {
  console.log("Running");
});