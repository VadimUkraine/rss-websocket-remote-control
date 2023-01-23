import { createWebSocketStream, WebSocketServer } from 'ws';
import { checkCommand } from './helpers/checkCommand.js';
import { formateFrontMessage } from './helpers/formateFrontMessage.js';
import { inputMessage } from './helpers/inputMessage.js';
import { outputMessage } from './helpers/outputMessage.js';

export const listenWebsocketServer = (port) => {
  const wss = new WebSocketServer({ port });
  inputMessage(`WS Server started at port ${wss.options.port}`);

  wss.on('connection', (ws) => {
    inputMessage(`Connected to Websocket Server at port ${wss.options.port}`);

    const webSocketStream = createWebSocketStream(ws, { decodeStrings: false });

    webSocketStream.on('data', async (data) => {
      try {
        const message = data.toString();
        inputMessage(message);

        const response = await checkCommand(message);

        if (response) {
          webSocketStream.write(response);
          outputMessage(response);
          // console.log('*** here RESPONSE ***');
        } else {
          const frontMessage = formateFrontMessage(message);
          webSocketStream.write(frontMessage);
        }
      } catch (error) {
        console.log('*** here handle ERROR ***', error);
      }
    });
  });
};
