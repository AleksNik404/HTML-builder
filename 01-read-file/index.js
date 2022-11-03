const path = require('path');
const fs = require('fs');

const pathTextFile = path.resolve(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathTextFile);

readStream.pipe(process.stdout);

////////// emiter
// let text = '';
// readStream.on('data', (chunk) => {
//   text += chunk;
// });
// readStream.on('end', () => {
//   console.log(text);
// });

/////////ASYNC FS///////////////////////////////////////////
// let text = fs.readFile(pathTextFile, 'utf-8', (err, data) => {
//   if (err) throw new Error('WRONNNG');

//   console.log(data);
// });
