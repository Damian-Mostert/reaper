// copy-files.js
const fs = require('fs-extra');
const path = require('path');
const sourceDir = path.join(__dirname, '../sample');
const destinationDir = process.cwd();
async function copyFiles() {
  try {
    if (fs.existsSync(sourceDir)) {
      await fs.copy(sourceDir, destinationDir);
      console.log(`All files from '${sourceDir}' have been copied to '${destinationDir}'.`);
    } else {
      console.error(`Source directory '${sourceDir}' does not exist.`);
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
}
copyFiles();
