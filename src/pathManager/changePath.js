import * as path from 'path';
import { readdir } from 'fs/promises';
import { operationFailedMassage } from '../massages/messages.js';

export const changePathToFolder = async (pathPrev, addNewPath) => {
  try {
    let newPath;
    if (path.isAbsolute(addNewPath)) {
      newPath = addNewPath;
    } else {
      const pathObj = path.parse(pathPrev);
      newPath = path.resolve(pathObj.base, pathObj.dir, pathObj.name, addNewPath);
    }
    await readdir(newPath);
    return newPath;
  } catch(error) {
    console.error(operationFailedMassage(), error)
  }
}