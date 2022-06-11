import * as os from 'node:os';

export const getOsEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const getOsCpus = () => {
  const cpusArr = os.cpus().map((elem) => {
    return {
      model: elem.model,
      rate: elem.speed
  }});
  const finalObj = {
    amount: os.cpus().length,
    cpus: cpusArr 
    }
  console.log(finalObj);
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