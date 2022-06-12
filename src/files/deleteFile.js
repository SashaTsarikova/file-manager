import { operationFailedMassage } from '../massages/messages.js';
import { unlink } from 'fs/promises';
import { getFilePath } from '../pathManager/getFilePath.js';

export const deleteFile = async (prevPath, pathToF) => {
  try {
    const pathToFile = getFilePath(prevPath, pathToF);
    await unlink(pathToFile);
  } catch(error) {
    console.error(operationFailedMassage(), error);
  }
}