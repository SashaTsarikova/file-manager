export const getStartPath = () => {
  return process.env.HOME || process.env.USERPROFILE;
}