import { operationFailedMassage } from '../massages/messages.js';
import { getFilePath } from '../pathManager/getFilePath.js';
import { pipeline } from 'stream/promises';
import { open } from 'node:fs/promises';

export const readFile = async (path, pathToF) => {
  let fd;
  try {
    const fullFilePath = getFilePath(path, pathToF);
    fd = await open(fullFilePath);
    await pipeline(
        fd.createReadStream(),
        process.stdout
    ) 
  } catch(error) {
      console.error(operationFailedMassage());
  }
};

// cd Desktop
// cat CV.pdf
// C:\Users\user\Desktop\CV.pdf
