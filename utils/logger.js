const chalk = require("chalk");
const readline = require("readline");

class Logger {
    constructor() {
        this.spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        this.currentFrame = 0;
        this.loadingInterval = null;
    }

    // Format timestamp
    getTimestamp() {
        return chalk.gray(`Reaper.js [${new Date().toLocaleTimeString()}]`);
    }

    // Basic log methods
    info(msg) {
        console.log(`${this.getTimestamp()} ${chalk.cyan("ℹ INFO:")} ${msg}`);
    }

    success(msg) {
        console.log(`${this.getTimestamp()} ${chalk.green("✔ SUCCESS:")} ${msg}`);
    }

    warning(msg) {
        console.log(`${this.getTimestamp()} ${chalk.yellow("⚠ WARNING:")} ${msg}`);
    }

    error(msg) {
        console.log(`${this.getTimestamp()} ${chalk.red("✖ ERROR:")} ${msg}`);
    }
    startLoading(msg) {
        //process.stdout.write("\n");
        this.currentFrame = 0;
        this.loadingInterval = setInterval(() => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(
                `${this.getTimestamp()} ${chalk.blue(this.spinnerFrames[this.currentFrame])} ${chalk.blue(msg)}`
            );
            this.currentFrame = (this.currentFrame + 1) % this.spinnerFrames.length;
        }, 100);
    }
    stopLoading(finalMessage = "Done!") {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            readline.cursorTo(process.stdout, 0);
            process.stdout.clearLine(0);
            console.log(`${this.getTimestamp()} ${chalk.green("✔")} ${chalk.green(finalMessage)}`);
        }
    }
}
const log = new Logger;
module.exports = log;