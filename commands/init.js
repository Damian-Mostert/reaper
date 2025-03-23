// copy-files.js
const fs = require('fs-extra');
const path = require('path');
const sourceDir = path.join(__dirname, '../sample');
const destinationDir = process.cwd();
const logger = require("../utils/logger");
logger.startLoading("Creating new reaper project in your current directory...");
async function copyFiles() {
  try {
    if (fs.existsSync(sourceDir)) {
      await fs.copy(sourceDir, destinationDir);
      logger.stopLoading('Success');
      logger.success(`All files from '${sourceDir}' have been copied to '${destinationDir}'.`)
    } else {
      logger.stopLoading('Error');
      logger.error(`Source directory '${sourceDir}' does not exist.`);
    }
  } catch (err) {
    logger.stopLoading('Error');
    logger.error('Error copying files:', err);
  }
}
copyFiles();
