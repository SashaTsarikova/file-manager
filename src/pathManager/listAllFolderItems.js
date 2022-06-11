import { readdir } from 'fs/promises';
import { operationFailedMassage } from '../massages/messages.js';

export const listAllFolderItems = async (path) => {
    try {
        const files = await readdir(path);
        for (const file of files)
            console.log(file);
    } catch(error) {
        console.error(operationFailedMassage());
    }
};