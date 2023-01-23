import { COMMANDS } from '../constants/commands.js';
import { COMMAND_NOT_EXIST } from '../constants/errors.js';
import { handleMouseMove } from '../mouse/mouseMove.js';
import { getMousePosition } from '../mouse/getMousePosition.js';
import { makePrintScreen } from '../print_screen/makePrintScreen.js';
import { handleDraw } from '../drawing/handleDraw.js';

const COMMANDS_MAP = {
  [COMMANDS.MOUSE_UP]: handleMouseMove,
  [COMMANDS.MOUSE_DOWN]: handleMouseMove,
  [COMMANDS.MOUSE_LEFT]: handleMouseMove,
  [COMMANDS.MOUSE_RIGHT]: handleMouseMove,
  [COMMANDS.MOUSE_POSITION]: getMousePosition,
  [COMMANDS.PRINT_SCREEN]: makePrintScreen,
  [COMMANDS.DRAW_CIRCLE]: handleDraw,
  [COMMANDS.DRAW_RECTANGLE]: handleDraw,
  [COMMANDS.DRAW_SQUARE]: handleDraw,
};

const parseCommand = (defaultCommand) => {
  const [command, ...commandArgs] = defaultCommand.split(' ');

  const isCommandExist = Object.values(COMMANDS).includes(command);

  if (!isCommandExist) {
    throw new Error(COMMAND_NOT_EXIST);
  }

  return {
    command,
    commandArgs,
  };
};

export const checkCommand = async (message) => {
  const { command, commandArgs } = parseCommand(message);
  const handler = COMMANDS_MAP[command];
  const result = await handler(command, commandArgs);

  return result;
};
