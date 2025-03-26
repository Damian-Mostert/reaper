const chalk = require("chalk");
const readline = require("readline");

class Logger {
    constructor() {
        this.spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        this.currentFrame = 0;
        this.loadingInterval = null;
        this.isLoading = false;
        this.buildStartTime = null;
    }

    // Format timestamp
    getTimestamp() {
        return chalk.gray(`Reaper.js [${new Date().toLocaleTimeString()}]`);
    }

    // Basic log methods
    info(msg) {
        this.stopLoading(); // Ensure loading is stopped before logging
        console.log(`${this.getTimestamp()} ${chalk.cyan("ℹ INFO:")} ${msg}`);
    }

    success(msg) {
        this.stopLoading(); // Ensure loading is stopped before logging
        console.log(`${this.getTimestamp()} ${chalk.green("✔ SUCCESS:")} ${msg}`);
    }

    warning(msg) {
        this.stopLoading(); // Ensure loading is stopped before logging
        console.log(`${this.getTimestamp()} ${chalk.yellow("⚠ WARNING:")} ${msg}`);
    }

    error(msg) {
        this.stopLoading(); // Ensure loading is stopped before logging
        console.log(`${this.getTimestamp()} ${chalk.red("✖ ERROR:")} ${msg}`);
    }

    startLoading(msg) {
        this.stopLoading(); // Stop any previous loading before starting a new one
        this.isLoading = true;
        this.currentFrame = 0;
        this.loadingInterval = setInterval(() => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(
                `${this.getTimestamp()} ${chalk.blue(this.spinnerFrames[this.currentFrame])} ${chalk.blue(msg)}`
            );
            this.currentFrame = (this.currentFrame + 1) % this.spinnerFrames.length;
        }, 100);
    }

    stopLoading(finalMessage = "") {
        if (this.isLoading) {
            this.isLoading = false;
            if (this.loadingInterval) {
                clearInterval(this.loadingInterval);
                readline.cursorTo(process.stdout, 0);
                process.stdout.clearLine(0);
                if (finalMessage) {
                    console.log(`${this.getTimestamp()} ${chalk.green("✔")} ${chalk.green(finalMessage)}`);
                }
            }
        }
    }

    // Question prompt with y/n input, without affecting the spinner
    async askQuestion(question) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(`${this.getTimestamp()} ${chalk.cyan(question)} ${chalk.magentaBright(`[Y/N]`)}: `, (answer) => {
                // Stop the spinner while waiting for the response
                this.stopLoading();
                answer = answer.toLowerCase().trim();
                rl.close();
                resolve(answer === 'y'); // true for 'y', false for 'n'
            });
        });
    }

    // Track and log the build time
    startBuildTimer() {
        this.buildStartTime = Date.now();
    }

    stopBuildTimer() {
        this.stopLoading()
        if (this.buildStartTime) {
            const buildDuration = ((Date.now() - this.buildStartTime) / 1000).toFixed(2); // in seconds
            console.log(`${this.getTimestamp()} ${chalk.green("✔")} ${chalk.green(`Build completed in ${buildDuration} seconds`)}`);
            this.buildStartTime = null; // Reset after logging the duration
        }
    }
}

const log = new Logger();
module.exports = log;
