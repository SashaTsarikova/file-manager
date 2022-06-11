import { operationFailedMassage } from '../massages/messages.js';
import * as path from 'node:path';
import { getFilePath } from '../pathManager/getFilePath.js';
import { rename } from 'fs/promises';

export const renameFile = async (prevPath, pathToF, fileName) => {
  try {
    const pathToFile = getFilePath(prevPath, pathToF);
    console.log(pathToFile);
    const pathObj = path.parse(pathToFile);
    await rename(getNewFilePath(pathObj, null), getNewFilePath(pathObj, fileName));
  } catch(error) {
      console.error(operationFailedMassage());
  }
};

function getNewFilePath(pathObj, newName) {
  if (newName) {
    if (newName.indexOf('.') !== -1) {
      return path.join(pathObj.dir, newName)
    } else {
      return path.join(pathObj.dir, `${newName}${pathObj.ext}`)
    }
  }
  return path.join(pathObj.dir,pathObj.base)
}

// cd Desktop
// add Sasha.txt

// rn ./Sasha.txt Lera.txt
// rn C:\Users\user\Desktop\Lera.txt Vova