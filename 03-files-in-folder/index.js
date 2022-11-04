const fs = require('fs/promises');
const path = require('path');

const pathToFolder = path.resolve(__dirname, 'secret-folder');

(async () => {
  try {
    let files = await fs.readdir(pathToFolder);

    for await (let file of files) {
      const pathFile = path.resolve(pathToFolder, file);
      const fileStat = await fs.stat(pathFile);

      let size = (fileStat.size / 1024).toFixed(3) + 'kb';

      if (fileStat.isFile())
        console.log(`${file} - ${path.extname(file)} - ${size}`);
    }
  } catch (error) {
    console.log('-_-', error);
  }
})();
