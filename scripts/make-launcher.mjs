import { chmod, writeFile } from "node:fs/promises";

const unixLauncher = "build/hello";
await writeFile(unixLauncher, '#!/usr/bin/env sh\nexec node "$(dirname "$0")/index.js" "$@"\n');
await chmod(unixLauncher, 0o755);
await writeFile("build/hello.cmd", "@echo off\r\nnode \"%~dp0index.js\" %*\r\n");
