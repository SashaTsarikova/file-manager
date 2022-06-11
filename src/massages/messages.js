export const pathMassage = (path) => {
  return `\nYou are currently in ${path} \n`
}

export const welcomeMassage = (userName) => {
  return `Welcome to the File Manager, ${userName}! \n`
}

export const goodbyMassage = (userName) => {
  return `\nThank you for using File Manager, ${userName}! \n`
}

export const invalidMassage = () => {
  return `\nInvalid input! \n`
}

export const operationFailedMassage = () => {
  return `\nOperation failed! \n`
}