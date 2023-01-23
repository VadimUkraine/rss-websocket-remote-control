import * as dotenv from 'dotenv';
import { env } from 'process';
import { httpServer } from './src/http_server/index.js';
import { listenWebsocketServer } from './src/ws_server/index.js';
import { inputMessage } from './src/ws_server/helpers/inputMessage.js';

dotenv.config();

const DEFAULT_HTTP_PORT = 8181;
const DEFAULT_WS_PORT = 8080;

const { HTTP_PORT = DEFAULT_HTTP_PORT, WS_PORT = DEFAULT_WS_PORT } = env;

inputMessage(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

listenWebsocketServer(Number(WS_PORT));
