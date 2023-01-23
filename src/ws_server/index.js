import { createWebSocketStream, WebSocketServer } from 'ws';
import { checkCommand } from './helpers/checkCommand.js';
import { formateFrontMessage } from './helpers/formateFrontMessage.js';
import { inputMessage } from './helpers/inputMessage.js';
import { outputMessage } from './helpers/outputMessage.js';
import { logError } from './helpers/logError.js';

export const listenWebsocketServer = (port) => {
  const wss = new WebSocketServer({ port });
  console.log(`WS Server started at port ${wss.options.port}`);

  wss.on('close', () => {
    console.log(
      `My dear friend, websocket port ${wss.options.port} was closed`
    );
  });

  process.on('SIGINT', () => {
    console.log('\nFirewell!!!');

    wss.close();
    process.exit(0);
  });

  wss.on('connection', (ws) => {
    console.log(`Connected to Websocket Server at port ${wss.options.port}`);

    const webSocketStream = createWebSocketStream(ws, { decodeStrings: false });

    webSocketStream.on('data', async (data) => {
      try {
        const message = data.toString();
        inputMessage(message);

        const response = await checkCommand(message);

        if (response) {
          webSocketStream.write(response);
          outputMessage(response);
        } else {
          const frontMessage = formateFrontMessage(message);
          webSocketStream.write(frontMessage);
        }
      } catch (error) {
        logError(error, ws);
      }
    });
  });
};
