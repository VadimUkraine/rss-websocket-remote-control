import { createWebSocketStream, WebSocketServer } from 'ws';
import { checkCommand } from './helpers/checkCommand.js';

export const listenWebsocketServer = port => {
  const wss = new WebSocketServer({ port });
  console.log(`WS Server started at port ${wss.options.port}`);

  wss.on('connection', ws => {
    console.log(`Connected to Websocket Server at port ${wss.options.port}`);

    const webSocketStream = createWebSocketStream(ws, { decodeStrings: false });

    webSocketStream.on('data', async (data) => {
      try {
        const message = data.toString();

        const response = await checkCommand(message);

        if (response) {
          webSocketStream.write(response);
          console.log('*** here RESPONSE ***')
        } else {
          console.log('*** here not RESPONSE ***')
        }
      } catch (error) {
        console.log('*** here handle ERROR ***', error);
      }
    });
  });
};
