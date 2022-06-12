import { operationFailedMassage, successMassage } from '../massages/messages.js';
import * as path from 'node:path';
import { getFilePath } from '../pathManager/getFilePath.js';
import { copyFile as copyF } from 'fs/promises';
import { constants } from 'fs';

export const copyFile = async (prevPath, pathToF, pathToNewDirectory) => {
  try {
    const pathToFile = getFilePath(prevPath, pathToF);
    const pathObjPrev = path.parse(pathToFile);
    const newPathToFile = getFilePath(prevPath, pathToNewDirectory);
    const pathObjNew = path.parse(newPathToFile);

    await copyF(pathToFile, getNewFilePath(newPathToFile, pathObjNew.ext, pathObjPrev.base), constants.COPYFILE_FICLONE);
    console.log(successMassage());
  } catch(error) {
      console.error(operationFailedMassage(), error);
  }
};

function getNewFilePath(pathToFile, ext, name) {
  if (ext) {
    return pathToFile;
  } else {
    return path.join(pathToFile, name)
  }
}
