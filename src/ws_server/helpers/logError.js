import { formateFrontMessage } from './formateFrontMessage.js';

export const logError = (error, ws) => {
  console.log(`-> Error: ${error.message}`);

  const message = formateFrontMessage(error.message);

  ws.send(message);
};
