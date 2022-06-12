import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { open, unlink } from 'node:fs/promises';
import path from 'path';
import { getFilePath } from './../pathManager/getFilePath.js';
import { operationFailedMassage, successMassage } from '../massages/messages.js';

export const compressFile = async (prevPath, pathToF, pathToDestination) => {
    const gzip = createBrotliCompress();
    let source;
    let destination;
    try {
        const pathToFile = getFilePath(prevPath, pathToF);
        const pathObj = path.parse(pathToFile);
        const pathToCompressFile = getPathToCompressFile(prevPath, pathToDestination, pathObj.base);
        source = await open(pathToFile);
        destination = await open(pathToCompressFile, 'w' );
        await pipeline(
            source.createReadStream(),
            gzip,
            destination.createWriteStream()
        )
        await unlink(pathToFile);
        console.log(successMassage());
    }
    catch(error) {
      console.error(operationFailedMassage(), error);
    } finally {
        await source.close();
    }
};

function getPathToCompressFile(prevPath, pathToDestination, name) {
  const pathToFile = getFilePath(prevPath, pathToDestination);
  const pathObj = path.parse(pathToFile);
  if (pathObj.ext) {
    return `${pathToFile}.br`
  } 
  return path.join(pathToFile, `${name}.br`)
}

// usage: 
// after compressing file will have name+ext like old_file_name.old_file_ext.br
// f.e. text.txt => text.txt.br