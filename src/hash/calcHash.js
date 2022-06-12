import { createHmac } from 'node:crypto';
import { operationFailedMassage } from '../massages/messages.js';
import * as fs from 'fs/promises';
import { getFilePath } from '../pathManager/getFilePath.js';

export const calcHash = async (prevPath, pathToAdd) => {
  try {
    const pathToFile = getFilePath(prevPath, pathToAdd);
    const file = await fs.readFile(pathToFile, 'utf8', 'r');
    const hash = createHmac('sha256', file)
                  .update(file)
                  .digest('hex');
    console.log(hash);
    return hash;
  } catch(error) {
    console.error(operationFailedMassage(), error);
  }
};

