export const pathMassage = (path) => {
  return `\n\x1b[33mYou are currently in ${path}\x1b[33m \n`
}

export const welcomeMassage = (userName) => {
  return `\x1b[32mWelcome to the File Manager, ${userName}!\x1b[32m \n`
}

export const goodbyMassage = (userName) => {
  return `\n\x1b[32mThank you for using File Manager, ${userName}!\x1b[32m \n`
}

export const invalidMassage = () => {
  return `\n\x1b[33mInvalid input!\x1b[33m \n`
}

export const operationFailedMassage = () => {
  return `\n\x1b[31mOperation failed!\x1b[31m \n`
}