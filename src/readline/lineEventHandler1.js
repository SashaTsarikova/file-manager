import { returnUpPath } from '.././pathManager/returnUpPath.js';
import {changePathToFolder} from '.././pathManager/changePath.js';
import { listAllFolderItems } from '.././pathManager/listAllFolderItems.js';
import { getOsCpus, getOsEOL, getOsArch, getOsUsername, getOsHomedir } from '.././os/osFunctions.js';
import { invalidMassage } from '.././massages/messages.js';
import { readFile } from '.././files/readFile.js';
import { createFile } from '.././files/createFile.js';
import { renameFile } from '.././files/renameFile.js';
import { copyFile } from '.././files/copyFile.js';
import { moveFile } from '.././files/moveFile.js';
import { deleteFile } from '.././files/deleteFile.js';
import { calcHash } from '.././hash/calcHash.js';
import { compressFile } from '.././arch/compressFile.js';
import { decompressFile } from '.././arch/decompressFile.js';

export async function lineEventHandler1(input, path) {
  switch (input) {
    case 'up':
      return returnUpPath(path);
      break;
    case 'ls':
      await listAllFolderItems(path);
      break;
    case 'os --EOL':
      getOsEOL();
      break;
    case 'os --cpus':
      getOsCpus();
      break;
    case 'os --homedir':
      getOsHomedir();
      break;
    case 'os --username':
      getOsUsername();
      break;
    case 'os --architecture':
      getOsArch();
      break; 
    default:
      const possibleNewPath = await additionalHandle(input, path);
      if (possibleNewPath) {
        return possibleNewPath;
      }
  }
}

async function additionalHandle(input, path) {
  if (input.startsWith('cd') && input.split(' ')[1]) {
    const addNewPath = input.split(' ')[1].trim()
    const newPath = await changePathToFolder(path, addNewPath);
    if (newPath) {
      return newPath;
    } 
  } else if (input.startsWith('cat') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await readFile(path, pathToFile);
  } else if (input.startsWith('add') && (input.split(' ').length > 1)) {
    const fileName = input.split(' ')[1].trim();
    await createFile(path, fileName);
  } else if (input.startsWith('rn') && input.split(' ').length === 3) {
    const [pathToFile, fileName] = input.split(' ').slice(1);
    await renameFile(path, pathToFile, fileName);
  } else if (input.startsWith('cp') && input.split(' ').length === 3) {
    const [pathToFile, pathToNewDirectory] = input.split(' ').slice(1);
    await copyFile(path, pathToFile, pathToNewDirectory);
  } else if (input.startsWith('mv') && input.split(' ').length === 3) {
    const [pathToFile, pathToNewDirectory] = input.split(' ').slice(1);
    await moveFile(path, pathToFile, pathToNewDirectory);
  } else if (input.startsWith('rm') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await deleteFile(path, pathToFile);
  } else if (input.startsWith('hash') && input.split(' ')[1]) {
    const pathToFile = input.split(' ')[1].trim();
    await calcHash(path, pathToFile);
  } else if (input.startsWith('compress') && input.split(' ').length === 3) {
    const [pathToFile, pathToDestination] = input.split(' ').slice(1);
    await compressFile(path, pathToFile, pathToDestination);
  } else if (input.startsWith('decompress') && input.split(' ').length === 3) {
    const [pathToFile, pathToDestination] = input.split(' ').slice(1);
    await decompressFile(path, pathToFile, pathToDestination);
  } else {
    console.error(invalidMassage());
  }
}