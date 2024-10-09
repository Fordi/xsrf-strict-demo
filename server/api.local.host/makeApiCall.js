import { parseCookies } from "../utils/cookies.js";

export default (req, res) => {
  const cookies = parseCookies(req.headers.cookie)
  if (cookies.authCookie === '12345') {
    res.writeHead(200);
    res.write("You're good.");
  } else {
    res.writeHead(401);
    res.write("Go away, hacker.");
  }
  res.end();
};