import { mouse, Point } from '@nut-tree/nut-js';
import { COMMANDS } from '../constants/commands.js';

const getMouseTrace = async (command, distance) => {
  const currentPoint = await mouse.getPosition();
  const points = [];

  switch (command) {
    case COMMANDS.MOUSE_UP: {
      points.push(new Point(currentPoint.x, currentPoint.y - distance));

      return points;
    }
    case COMMANDS.MOUSE_DOWN: {
      points.push(new Point(currentPoint.x, currentPoint.y + distance));

      return points;
    }
    case COMMANDS.MOUSE_LEFT: {
      points.push(new Point(currentPoint.x - distance, currentPoint.y));

      return points;
    }
    case COMMANDS.MOUSE_RIGHT: {
      points.push(new Point(currentPoint.x + distance, currentPoint.y));

      return points;
    }
    default:
      return points;
  }
};

const moveMouse = async (target) => {
  await mouse.move(target);
};

export const handleMouseMove = async (command, distanceStr) => {
  const distance = Number(distanceStr);
  const points = await getMouseTrace(command, distance);
  moveMouse(points);
};
