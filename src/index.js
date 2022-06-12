import { stdin, stdout } from 'process';
import * as readline from 'readline';
import { goodbyMassage, invalidMassage, pathMassage, welcomeMassage } from './massages/messages.js';
import { getStartPath } from './pathManager/getStartPath.js';
import { returnUpPath } from './pathManager/returnUpPath.js';
import {changePathToFolder} from './pathManager/changePath.js';
import { listAllFolderItems } from './pathManager/listAllFolderItems.js';
import { getOsCpus, getOsEOL, getOsArch, getOsUsername, getOsHomedir } from './os/osFunctions.js';
import { readFile } from './files/readFile.js';
import { createFile } from './files/createFile.js';
import { renameFile } from './files/renameFile.js';
import { copyFile } from './files/copyFile.js';
import { moveFile } from './files/moveFile.js';
import { deleteFile } from './files/deleteFile.js';
import { calcHash } from './hash/calcHash.js';


const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const UserName = process.argv[2].split('=')[1];
let path = getStartPath();

rl.setPrompt(welcomeMassage(UserName) + pathMassage(path));
rl.prompt();


rl.on('close', () => {
  console.log(goodbyMassage(UserName));
});


rl.on('line', async (input) => {
  switch (input) {
    case 'up':
      path = returnUpPath(path);
      consolePath(path);
      break;
    case 'ls':
      await listAllFolderItems(path);
      consolePath();
      break;
    case 'os --EOL':
      getOsEOL();
      consolePath();
      break;
    case 'os --cpus':
      getOsCpus();
      consolePath();
      break;
    case 'os --homedir':
      getOsHomedir();
      consolePath();
      break;
    case 'os --username':
      getOsUsername();
      consolePath();
      break;
    case 'os --architecture':
      getOsArch();
      consolePath();
      break;
    default:
      additionalHandle(input);
  }
});

async function additionalHandle(input) {
  if (input.startsWith('cd') && input.split(' ')[1]) {
    const addNewPath = input.split(' ')[1].trim()
    const newPath = await changePathToFolder(path, addNewPath);
    if (newPath) {
      path = newPath;
    } 
    consolePath();
  } else if (input.startsWith('cat') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await readFile(path, pathToFile);
    consolePath();
  } else if (input.startsWith('add') && (input.split(' ').length > 1)) {
    const fileName = input.split(' ')[1].trim();
    await createFile(path, fileName);
    consolePath();
  } else if (input.startsWith('rn') && input.split(' ').length === 3) {
    const [pathToFile, fileName] = input.split(' ').slice(1);
    await renameFile(path, pathToFile, fileName);
    consolePath();
  } else if (input.startsWith('cp') && input.split(' ').length === 3) {
    const [pathToFile, pathToNewDirectory] = input.split(' ').slice(1);
    await copyFile(path, pathToFile, pathToNewDirectory);
    consolePath();
  } else if (input.startsWith('mv') && input.split(' ').length === 3) {
    const [pathToFile, pathToNewDirectory] = input.split(' ').slice(1);
    await moveFile(path, pathToFile, pathToNewDirectory);
    consolePath();
  } else if (input.startsWith('rm') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await deleteFile(path, pathToFile);
    consolePath();
  } else if (input.startsWith('hash') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await calcHash(path, pathToFile);
    consolePath();
  } else {
    console.error(invalidMassage());
    consolePath();
  }
}

const consolePath = () => {
  rl.setPrompt(pathMassage(path));
  rl.prompt();
}

// при вводе без аргументов всплывает ошибка
// сделать более компактный код
