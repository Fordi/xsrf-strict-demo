import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CLIENT_ROOT } from "../utils/consts.js";



export default async (req, res) => {
  res.writeHead(200);
  const content = await readFile(join(CLIENT_ROOT, "index.html"));
  res.write(content);
  res.end();
};