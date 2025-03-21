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

    // Start animated loading
    startLoading(msg) {
        process.stdout.write("\n"); // New line before animation starts
        this.currentFrame = 0;
        this.loadingInterval = setInterval(() => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(
                `${this.getTimestamp()} ${chalk.blue(this.spinnerFrames[this.currentFrame])} ${chalk.blue(msg)}`
            );
            this.currentFrame = (this.currentFrame + 1) % this.spinnerFrames.length;
        }, 100);
    }

    // Stop animated loading and replace with a success message
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
log.startLoading()
log.info("Server is starting...");
log.success("Connected to database.");
log.warning("Low memory detected.");
log.error("Server crashed.");