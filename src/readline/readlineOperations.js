import { stdin, stdout } from 'process';
import * as readline from 'readline';
import { goodbyMassage, invalidMassage, pathMassage, welcomeMassage } from '.././massages/messages.js';
import { getStartPath } from '.././pathManager/getStartPath.js';
import { lineEventHandler1 } from './lineEventHandler1.js';

export function startReadline() {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });
  
  const UserName = process.argv[2].split('=')[1];
  let path = getStartPath();
  
  rl.setPrompt(welcomeMassage(UserName) + pathMassage(path));
  rl.prompt();
  
  
  rl.on('close', () => {
    console.log(goodbyMassage(UserName));
  });
  
  
  rl.on('line', async (input) => {
    if (input === '.exit') {
      rl.close()
    } else {
      const possibleNewPath = await lineEventHandler1(input, path);
      if (possibleNewPath) {
        path = possibleNewPath;
      }
      consolePath();
    }
  });
  
  
  const consolePath = () => {
    rl.setPrompt(pathMassage(path));
    rl.prompt();
  }
}
