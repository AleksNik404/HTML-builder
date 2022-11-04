const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pathToFile = path.resolve(__dirname, 'ConsoleLog.txt');
let ws = fs.createWriteStream(pathToFile);

/////////////////////////////////////////////
////////

console.log('---------------');
console.log('Hi, Write something in the console');

rl.on('line', saveMessageInFile);
rl.on('SIGINT', closeMessage);

////////
/////////////////////////////////////////////
function saveMessageInFile(text) {
  if (text === 'exit') closeMessage();
  else ws.write(text + '\r\n');
}
function closeMessage() {
  console.log(`Text stored in the ConsoleLog.txt file. Have a nice day.`);
  console.log('---------------');
  rl.close();
}
