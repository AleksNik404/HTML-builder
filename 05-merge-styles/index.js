const fs = require('fs');
const path = require('path');

const stylesFolder = path.resolve(__dirname, 'styles');
const distFolder = path.resolve(__dirname, 'project-dist');
const cssBundle = path.resolve(distFolder, 'bundle.css');

const ws = fs.createWriteStream(cssBundle);

async function bundleCSS() {
  try {
    const files = await fs.promises.readdir(stylesFolder);
    const styles = files.filter((file) => path.extname(file) === '.css');

    for await (const style of styles) {
      const pathForStyle = path.resolve(stylesFolder, style);
      const rs = fs.createReadStream(pathForStyle);

      rs.pipe(ws);
    }
  } catch (error) {
    console.log('-_-', error);
  }
}

bundleCSS();
