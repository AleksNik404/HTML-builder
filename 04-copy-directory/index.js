const fs = require('fs/promises');
const path = require('path');

const curFolder = path.resolve(__dirname, 'files');
const newFolder = path.resolve(__dirname, 'files-copy');

(async () => {
  try {
    //Delete and create folder
    await fs.rm(newFolder, { force: true, recursive: true });
    await fs.mkdir(newFolder, { recursive: true });

    let files = await fs.readdir(curFolder);

    for await (let file of files) {
      let pathCur = path.resolve(curFolder, file);
      let pathNew = path.resolve(newFolder, file);

      // Skip Folders
      const fileStat = await fs.stat(path.resolve(curFolder, file));
      if (!fileStat.isFile()) {
        console.log(`Folders doesn't copy, --${file}  | Only files`);
        continue;
      }

      // Copy one file
      fs.copyFile(`${pathCur}`, `${pathNew}`);
    }
  } catch (error) {
    console.log('-_-', error);
  }
})();
