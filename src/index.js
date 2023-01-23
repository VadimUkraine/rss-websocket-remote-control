import * as dotenv from 'dotenv';
import { env } from 'process';
import { httpServer } from './http_server/index.js';
import { listenWebsocketServer } from './ws_server/index.js';

dotenv.config();

const DEFAULT_HTTP_PORT = 8181;
const DEFAULT_WS_PORT = 8080;

const { HTTP_PORT = DEFAULT_HTTP_PORT, WS_PORT = DEFAULT_WS_PORT } = env;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

listenWebsocketServer(Number(WS_PORT));
