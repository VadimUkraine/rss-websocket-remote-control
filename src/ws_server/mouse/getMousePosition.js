import { mouse } from '@nut-tree/nut-js';
import { COMMANDS } from '../constants/commands.js';

const getCoordinatesMessage = ({ x, y }) =>
  `${COMMANDS.MOUSE_POSITION} ${x},${y}`;

export const getMousePosition = async () => {
  const point = await mouse.getPosition();
  const positionString = getCoordinatesMessage(point);

  return positionString;
};
