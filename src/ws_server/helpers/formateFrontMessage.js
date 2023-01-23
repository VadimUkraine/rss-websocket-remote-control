export const formateFrontMessage = (message) => {
  const unbreakableSpaceChar = '\u00A0';
  const normalizeMessage = message.split(' ').join(unbreakableSpaceChar);

  return normalizeMessage;
};
