import http from "node:http";
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

const clientRoot = new URL("../client", import.meta.url).pathname;
const formatCookies = (name, value, options) => [
  `${name}=${value}`,
  ...Object.entries(options).map(([key, setting]) => (
    setting && (setting === true ? key : `${key}=${setting}`)
  ))
].join('; ');


const server = http.createServer(function (req, res) {
  res.setHeader("set-cookie", formatCookies("authCookie", "12345", {
    HttpOnly: true,
    SameSite: "Strict",
  }));
  res.writeHead(200);
  const content = createReadStream(join(clientRoot, "index.html")).pipe(res);
  res.end();
});

server.listen(8080, 'localhost', () => {
  console.log("Running");
});