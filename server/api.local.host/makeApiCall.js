export default (req, res) => {
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
};