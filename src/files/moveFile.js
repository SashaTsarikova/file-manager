import { operationFailedMassage } from '../massages/messages.js';
import { copyFile } from './copyFile.js';
import { unlink } from 'fs/promises';
import { getFilePath } from '../pathManager/getFilePath.js';

export const moveFile = async (prevPath, pathToF, pathToNewDirectory) => {
  try {
    await copyFile(prevPath, pathToF, pathToNewDirectory);
    const pathToFile = getFilePath(prevPath, pathToF);
    await unlink(pathToFile);
  } catch(error) {
    console.error(operationFailedMassage(), error);
  }
}

// cd Desktop
// mv text/Vova.txt ..