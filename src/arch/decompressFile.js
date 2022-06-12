import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { open, unlink } from 'node:fs/promises';
import path from 'path';
import { getFilePath } from './../pathManager/getFilePath.js';
import { operationFailedMassage, successMassage } from '../massages/messages.js';

export const decompressFile = async (prevPath, pathToF, pathToDestination) => {
    const gzip = createBrotliDecompress();
    let source;
    let destination;
    try {
        const pathToFile = getFilePath(prevPath, pathToF);
        const pathObj = path.parse(pathToFile);
        const pathToDecompressFile = getPathToDecompressFile(prevPath, pathToDestination, pathObj.base);
        source = await open(pathToFile);
        destination = await open(pathToDecompressFile, 'w' );
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
    }
};

function getPathToDecompressFile(prevPath, pathToDestination, name) {
  const pathToFile = getFilePath(prevPath, pathToDestination);
  const pathObj = path.parse(pathToFile);
  if (pathObj.ext) {
    return pathToFile
  } 
  return path.join(pathToFile, name.slice(0, name.lastIndexOf('.')))
}

// decompress Sasha.txt.br .