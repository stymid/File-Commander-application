📄 Project: File System Command Processor (Node.js)

📝 Overview

A practice Node.js CLI-style tool to learn how to work with the file system, streams, and buffers.
It watches a file called command.txt for changes, then parses text commands inside it and performs the requested file operations.

⚡️ This project was built to practice Node.js FS APIs and low-level I/O handling as a front-end developer, to better understand backend/server file operations (not to work as a backend engineer).

⸻

🚀 Features
• 📡 Live file watcher: Uses fs.watch with an AbortController to stop watching after a timeout.
• 📝 Command-based file control:
• create a file <path> → Creates a new file if it doesn’t exist.
• delete the file <path> → Deletes a file.
• rename the file <oldPath> to <newPath> → Renames a file.
• add to the file <path> this content: <content> → Writes content to a file.
• ⚡ Uses Buffers for reading/writing raw file data.
• 🔥 Async/Await with fs/promises for modern clean code.
• 🧹 Graceful error handling for missing files or wrong commands.

⸻

🛠️ Tech Stack
• Node.js (fs/promises, Buffer, AbortController, watch)
• JavaScript (ESM Modules)
• Low-level I/O operations (no external libraries)

⸻

📌 How it works 1. A file named command.txt is watched for changes. 2. When its content changes, the program:
• Reads the entire file into a Buffer.
• Parses the text to detect which command to run.
• Executes the action (create, delete, rename, add content). 3. The program logs the result to the console.

Example:

create a file ./notes.txt
add to the file ./notes.txt this content: Hello from Node.js!
rename the file ./notes.txt to ./myNotes.txt
delete the file ./myNotes.txt

⸻

🧩 Possible Improvements
• Add input validation for malformed commands.
• Support resumable write operations for very large files.
• Add unit tests for each command.
• Turn into a CLI tool with arguments (e.g., node app.js --create file.txt).
