import { COMMANDS } from '../constants/commands.js';
import { COMMAND_NOT_EXIST } from '../constants/errors.js';
import { handleMouseMove } from '../mouse/mouseMove.js';

const COMMANDS_MAP = {
  [COMMANDS.MOUSE_UP]: handleMouseMove,
};

const parseCommand = defaultCommand => {
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
  console.log('CHECK COMMAND ***', message)

  const { command, commandArgs } = parseCommand(message);

  const handler = COMMANDS_MAP[command];
  const result = await handler(command, commandArgs);

  console.log('COMMAND handler result ***', result)
  // return result;
};
