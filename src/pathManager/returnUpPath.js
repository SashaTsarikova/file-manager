import * as path from 'path';

export const returnUpPath = (prevPath) => {
  return path.dirname(prevPath);
}