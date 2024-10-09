
const formatCookies = (name, value, options) => [
  `${name}=${value}`,
  ...Object.entries(options).map(([key, setting]) => (
    setting && (setting === true ? key : `${key}=${setting}`)
  ))
].join('; ');

export default (req, res) => {
  res.setHeader("set-cookie", formatCookies("authCookie", "12345", {
    HttpOnly: true,
    SameSite: "Strict",
    Domain: ".local.host",
  }));
  res.writeHead(200);
  res.write('true');
  res.end();
};