import http from "node:http";
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const clientRoot = new URL("../client", import.meta.url).pathname;
const formatCookies = (name, value, options) => [
  `${name}=${value}`,
  ...Object.entries(options).map(([key, setting]) => (
    setting && (setting === true ? key : `${key}=${setting}`)
  ))
].join('; ');


const server = http.createServer(async (req, res) => {
  if (req.headers.referer) {
    res.setHeader("access-control-allow-origin", req.headers.referer.replace(/\/$/, ''));
    res.setHeader("access-control-allow-credentials", true);
    res.setHeader("vary", "Origin");
  }

  if (req.headers.host === 'api.local.host:8080' && req.url === '/authenticate') {
    res.setHeader("set-cookie", formatCookies("authCookie", "12345", {
      HttpOnly: true,
      SameSite: "Strict",
      Domain: "api.local.host",
    }));
    res.writeHead(200);
    res.write('');
    res.end();
    return;
  }
  if (req.headers.host === 'api.local.host:8080' && req.url === '/makeApiCall') {
    const cookies = (req.headers.cookie ?? "").split(';').reduce((o, c) => {
      const [name, ...value] = c.split('=');
      o[name.trim()] = value.join('=').trim();
      return o;
    }, {});
    console.log(cookies);
    if (cookies.authCookie === '12345') {
      res.writeHead(200);
      res.write("You're good.");
    } else {
      res.writeHead(401);
      res.write("Go away, hacker.");
    }
    res.end();
    return;
  }
  res.setHeader("access-control-allow-credentials", "true");
  res.writeHead(200);
  const content = await readFile(join(clientRoot, "index.html"));
  res.write(content);
  res.end();
});

server.listen(8080, 'localhost', () => {
  console.log("Running");
});