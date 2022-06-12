import { readdir } from 'fs/promises';
import { operationFailedMassage } from '../massages/messages.js';

export const listAllFolderItems = async (path) => {
    try {
        const files = await readdir(path);
        for (const file of files)
            console.log(`\x1b[36m${file}\x1b[36m`);
    } catch(error) {
        console.error(operationFailedMassage(), error);
    }
};