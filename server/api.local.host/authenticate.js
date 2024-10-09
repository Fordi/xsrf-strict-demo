import { formatCookie } from "../utils/cookies.js";

export default (req, res) => {
  res.setHeader("set-cookie", formatCookie("authCookie", "12345", {
    HttpOnly: true,
    SameSite: "Strict",
    Domain: ".local.host",
  }));
  res.writeHead(200);
  res.write('true');
  res.end();
};