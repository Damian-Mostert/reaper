#!/usr/bin/env node
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const mkFiles = fs.readdirSync(path.join(__dirname, "./commands/new"));
const mkCommands = {};

for (const file of mkFiles) {
  mkCommands[`new:${file.replace(".ts", "")}`] = `npx env-cmd -f "${path.join(__dirname, "../../.env")}" npx tsx ${__dirname}/commands/new/${file}`;
}

const scripts = {
  ...mkCommands,
  "help": `node ${path.join(__dirname,"commands/help.js")}`,
  "seed": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/seed")} {{}}`,
  "migrate": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/migrate")}`,
  "rollback": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/rollback")}`,
  "init": `node ${__dirname}/init.js`,
  "build": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/build.js")}`,
  "dev": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/dev.js")}`,
  "start": `npx env-cmd -f "${path.join(process.cwd(), "./.env")}" node ${path.join(__dirname, "commands/start.js")}`,
};

const command = args[0];
const commandArgs = args.slice(1);
if (scripts[command]) {
  let script = scripts[command];  
  commandArgs.forEach((arg, index) => {
    script = script.replace(/{{}}/g,commandArgs[index]);
  });
  const child = spawn(script, { stdio: "inherit", shell: true });
  child.on("error", (err) => {
    console.error(`Failed to start command: ${command}`);
    console.error(err.message);
    process.exit(1);
  });
  child.on("exit", (code) => {
    process.exit(code || 0);
  });
} else {
  console.log(`Unknown command: ${command}`);
  console.log("Available commands:", Object.keys(scripts).join(", "));
  process.exit(1);
}