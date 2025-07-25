"use strict";

import { watch, open, rm } from "node:fs/promises";

import { Buffer } from "node:buffer";

const __filename = "command.txt";

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 100000);

async function createFile(path) {
  try {
    const existingFileHandle = await open(path, "r");
    await existingFileHandle.close();

    // we allready have the file...
    return console.log(`the file ${path} is allready exist.`);
  } catch (err) {
    // the file doesn't exist
    const newFileHandle = await open(path, "w");
    console.log(`the file ${path} is created!`);
    newFileHandle.close();
  }
}
async function deleteFile(path) {
  try {
    const deleteHandler = await rm(path);
    return console.log("remove was successfull");
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  const CREATE_FILE = "create file";
  const DELETE_FILE = "delete file";

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
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    // create a file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file
    // delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const path = command.substring(DELETE_FILE.length + 1);

      deleteFile(path);
    }
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
    if (err.name === "AbortError") return;
    throw err;
  }
})();
