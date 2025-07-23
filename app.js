import { watch, open } from "node:fs/promises";

import { Buffer } from "node:buffer";

const __filename = "command.txt";

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 100000);

(async () => {
  const commandFileHandler = await open("./command.txt", "r");
  commandFileHandler.on("change", async () => {
    // get size of out file
    const size = (await commandFileHandler.stat()).size;
    // allocate out buffer
    const buff = Buffer.alloc(size);
    // the location at which we want to start to filling our buffer
    const offset = 0;
    // how many bytes we want to read
    const length = buff.byteLength;
    // the position that we want to start reading the file
    const position = 0;

    // we allwase want to start read the whole contentr (from beganing all the way to the end)
    const contentFile = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );
    console.log(contentFile.buffer.toString("utf-8"));
  });

  try {
    // watcher...
    const watcher = watch(__filename, { signal });
    for await (const event of watcher) {
      if (event.eventType === "change") {
        commandFileHandler.emit("change");
      }
    }
  } catch (err) {
    console.log("i am logging");
    if (err.name === "AbortError") return;
    throw err;
  }
})();
