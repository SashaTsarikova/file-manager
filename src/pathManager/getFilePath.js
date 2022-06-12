import * as path from 'path';

export const getFilePath = (pathPrev, addNewPath) => {
  if (path.isAbsolute(addNewPath)) return addNewPath;
  
  const pathObj = path.parse(pathPrev);
  const newPath = path.resolve(pathObj.base, pathObj.dir, pathObj.name, addNewPath);
  return newPath;
}