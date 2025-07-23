import { watch, open } from "node:fs/promises";

import { Buffer } from "node:buffer";

const __filename = "command.txt";

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 100000);

(async () => {
  const commandFileHandler = await open("./command.txt", "r");

  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher) {
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;
      const contentFile = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      if (event.eventType === "change") {
        console.log(contentFile.buffer.toString("utf-8"));
      }
    }
  } catch (err) {
    console.log("i am logging");
    if (err.name === "AbortError") return;
    throw err;
  }
})();
