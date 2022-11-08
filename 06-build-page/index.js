const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const pathProjectFolder = path.resolve(__dirname, 'project-dist');

// new
const pathToBundleHTML = path.resolve(pathProjectFolder, 'index.html');
const pathToBundleCSS = path.resolve(pathProjectFolder, 'style.css');
const pathToBundleAssets = path.resolve(pathProjectFolder, 'assets');

//currently
const pathToComponents = path.resolve(__dirname, 'components');
const pathToTemplate = path.resolve(__dirname, 'template.html');
const pathToStyles = path.resolve(__dirname, 'styles');
const pathToAssets = path.resolve(__dirname, 'assets');

async function buildPage() {
  await createFolder(pathProjectFolder);
  await createFolder(pathToBundleAssets);

  await copyReplaceTemplate();
  await bundleCSS();
  await copyAssets(pathToAssets);
}
buildPage();

////////////////////////////////
////////////////////////////////
////////////////////////////////

async function createFolder(pathNewFolder) {
  try {
    await fs.rm(pathNewFolder, { force: true, recursive: true });
    await fs.mkdir(pathNewFolder, { recursive: true });
  } catch (error) {
    console.log('-_-', error);
  }
}

async function copyReplaceTemplate() {
  try {
    const components = await fs.readdir(pathToComponents);
    const templateFile = await fs.readFile(pathToTemplate, 'utf-8');

    let copyTemplate = templateFile;

    for await (const comp of components) {
      const pathComp = path.resolve(pathToComponents, comp);
      const compHTML = await fs.readFile(pathComp, 'utf-8');
      const compBaseName = path.basename(comp, '.html');

      copyTemplate = copyTemplate.replaceAll(`{{${compBaseName}}}`, compHTML);
    }
    fs.writeFile(pathToBundleHTML, copyTemplate);
  } catch (error) {
    console.log('-_-', error);
  }
}

async function bundleCSS() {
  try {
    const files = await fs.readdir(pathToStyles);
    const styles = files.filter((file) => path.extname(file) === '.css');

    for await (const css of styles) {
      const pathToCurStyle = path.resolve(pathToStyles, css);
      const dataStyle = await fs.readFile(pathToCurStyle, 'utf-8');

      fs.appendFile(pathToBundleCSS, dataStyle + os.EOL);
    }
  } catch (error) {
    console.log('-_-', error);
  }
}

async function copyAssets(pathFolder) {
  try {
    const files = await fs.readdir(pathFolder);

    for await (const file of files) {
      const pathToFile = path.resolve(pathFolder, file);
      const fileStat = await fs.stat(pathToFile);

      let pathToCopy = pathToFile.replace(
        '06-build-page',
        path.join('06-build-page', 'project-dist')
      );

      if (!fileStat.isFile()) {
        await createFolder(pathToCopy);
        copyAssets(pathToFile);
      } else {
        await fs.copyFile(pathToFile, pathToCopy);
      }
    }
  } catch (error) {
    console.log('-_-', error);
  }
}
