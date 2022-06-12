import * as os from 'node:os';
import { operationFailedMassage } from '../massages/messages.js';

export const getOsEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const getOsCpus = () => {
  try {
    const cpusArr = os.cpus().map((elem) => {
      const speed = elem.speed / 1000 < 0.1 ? elem.speed * 100 : elem.speed;
      return {
        model: elem.model,
        rate:  speed
    }});
    const finalObj = {
      amount: os.cpus().length,
      cpus: cpusArr 
      }
    console.log(finalObj);
  } catch(error) {
    console.error(operationFailedMassage(), error)
 }
}

export const getOsArch = () => {
  console.log(os.arch())
}

export const getOsUsername = () => {
  console.log(os.userInfo().username)
}

export const getOsHomedir = () => {
  console.log(os.homedir())
}