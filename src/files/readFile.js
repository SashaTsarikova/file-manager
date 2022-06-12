import { operationFailedMassage } from '../massages/messages.js';
import { getFilePath } from '../pathManager/getFilePath.js';
import { pipeline } from 'stream/promises';
import { open, readFile as readF } from 'node:fs/promises';

export const readFile = async (path, pathToF) => {
  try {
    const fullFilePath = getFilePath(path, pathToF);
    const fileData = await readF(fullFilePath, { encoding: 'utf8', flag: 'r'});
    console.log(fileData)
  } catch(error) {
    console.error(operationFailedMassage(), error);
  }
};

// cat Desktop/Vova.txt
// cd Desktop
// cat CV.pdf
// C:\Users\user\Desktop\CV.pdf


// export const readFile = async (path, pathToF) => {
//   let fd;
//   try {
//     const fullFilePath = getFilePath(path, pathToF);
//     fd = await open(fullFilePath);
//     const rs = fd.createReadStream();
//     await pipeline(
//         rs,
//         process.stdout
//     );
//     fd.on('end', () => console.log('sss'))
//   } catch(error) {
//       console.error(operationFailedMassage());
//   } finally {
//     await fd.close();
//   }
// };