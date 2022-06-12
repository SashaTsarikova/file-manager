import { operationFailedMassage, successMassage } from '../massages/messages.js';
import * as path from 'node:path';
import { getFilePath } from '../pathManager/getFilePath.js';
import { rename } from 'fs/promises';

export const renameFile = async (prevPath, pathToF, fileName) => {
  try {
    const pathToFile = getFilePath(prevPath, pathToF);
    const pathObj = path.parse(pathToFile);
    await rename(getNewFilePath(pathObj, null), getNewFilePath(pathObj, fileName));
    console.log(successMassage());
  } catch(error) {
      console.error(operationFailedMassage(), error);
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
