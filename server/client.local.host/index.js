import { readFile } from "node:fs/promises";
import { join } from "node:path";

const clientRoot = new URL("../../client", import.meta.url).pathname;

export default async (req, res) => {
  res.writeHead(200);
  const content = await readFile(join(clientRoot, "index.html"));
  res.write(content);
  res.end();
};