import { operationFailedMassage, successMassage } from '../massages/messages.js';
import { writeFile } from 'node:fs/promises';
import * as path from 'node:path';

export const createFile = async (directPath, fileName) => {
  try {
    const pathToFile = path.join(directPath, fileName);
    await writeFile(pathToFile, '', { encoding: 'utf8', flag: 'wx'});
    console.log(successMassage());
  } catch(error) {
      console.error(operationFailedMassage());
  }
};