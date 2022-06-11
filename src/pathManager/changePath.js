import * as path from 'path';
import { readdir } from 'fs/promises';
import { operationFailedMassage } from '../massages/messages.js';

export const changePathToFolder = async (pathPrev, addNewPath) => {
  try {
    const pathObj = path.parse(pathPrev);
    const newPath = path.resolve(pathObj.base, pathObj.dir, pathObj.name, addNewPath);
    await readdir(newPath);
    return newPath;
  } catch {
    console.error(operationFailedMassage())
  }
}