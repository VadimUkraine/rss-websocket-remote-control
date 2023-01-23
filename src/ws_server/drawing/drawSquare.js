import { COMMANDS } from '../constants/commands.js';
import { drawRectangle } from './drawRectangle.js';

export const drawSquare = async ({ size }) => {
  await drawRectangle({
    height: size,
    width: size,
    command: COMMANDS.DRAW_RECTANGLE,
  });
};
