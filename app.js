import { watch } from "node:fs/promises";
const __filename = "command.txt";

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher) {
      console.log(`[${new Date().toLocaleTimeString()}]`, event);
    }
  } catch (err) {
    console.log("i am logging");
    if (err.name === "AbortError") return;
    throw err;
  }
})();
