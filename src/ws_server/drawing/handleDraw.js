import { COMMANDS } from '../constants/commands.js';
import { WRONG_ARGUMENT } from '../constants/errors.js';
import { drawCircle } from './drawCircle.js';
import { drawSquare } from './drawSquare.js';
import { drawRectangle } from './drawRectangle.js';

const getHandler = (command) => {
  let handler;

  switch (command) {
    case COMMANDS.DRAW_RECTANGLE:
      handler = drawRectangle;
      break;

    case COMMANDS.DRAW_SQUARE:
      handler = drawSquare;
      break;

    case COMMANDS.DRAW_CIRCLE:
    default:
      handler = drawCircle;
  }

  return handler;
};

const convertToNumber = (size) => {
  if (!size) {
    throw new Error(WRONG_ARGUMENT);
  }

  return Number(size);
};

const getArgs = (command, [sizeA, sizeB]) => {
  switch (command) {
    case COMMANDS.DRAW_RECTANGLE:
      return {
        command,
        width: convertToNumber(sizeA),
        height: convertToNumber(sizeB),
      };

    case COMMANDS.DRAW_SQUARE:
      return {
        command,
        size: convertToNumber(sizeA),
      };

    default:
      return {
        command,
        radius: convertToNumber(sizeA),
      };
  }
};

const debounce = (func, timeout = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const handleDraw = async (command, sizes) => {
  const figureHandler = getHandler(command);
  const handlerArgs = getArgs(command, sizes);
  const funcWithDebounce = debounce(() => figureHandler(handlerArgs));

  await funcWithDebounce();
};
