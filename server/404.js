export default (req, res) => {
  res.writeHead(404);
  res.write("Not found");
  res.end();
}