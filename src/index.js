import { stdin, stdout } from 'process';
import * as readline from 'readline';
import * as os from 'os';
import { goodbyMassage, invalidMassage, pathMassage, welcomeMassage } from './massages/messages.js';
import { getStartPath } from './pathManager/getStartPath.js';
import { returnUpPath } from './pathManager/returnUpPath.js';
import {changePathToFolder} from './pathManager/changePath.js';
import { listAllFolderItems } from './pathManager/listAllFolderItems.js';
import { getOsCpus, getOsEOL, getOsArch, getOsUsername, getOsHomedir } from './os/osFunctions.js';

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
  if (input.startsWith('cd')) {
    const addNewPath = input.split(' ')[1].trim()
    const newPath = await changePathToFolder(path, addNewPath);
    if (newPath) {
      path = newPath;
    } 
    consolePath();
  } else if () {

  } else {
    console.error(invalidMassage())
  }
}

const consolePath = () => {
  rl.setPrompt(pathMassage(path));
  rl.prompt();
}