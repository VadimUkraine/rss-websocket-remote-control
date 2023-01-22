import { mouse, Point } from '@nut-tree/nut-js';
import { COMMANDS } from '../constants/commands.js';


const getMouseTrace = async (command, distance) => {
  console.log('** points *** 1111', mouse)
  const currentPoint = await mouse.getPosition();
  console.log('** points *** 222', currentPoint)
  const points = [];

  if (command === COMMANDS.MOUSE_UP) {
    points.push(new Point(currentPoint.x, currentPoint.y - distance));
  }

  console.log('** points *** ', points)
  return points;
};

const moveMouse = async (target) => {
  await mouse.move(target);
};

export const handleMouseMove = async (command, distanceStr) => {
  console.log('** points 333*** 11', command, distanceStr)
  const distance = Number(distanceStr);
  console.log('** points 333*** 22', command, distanceStr)
  const points = await getMouseTrace(command, distance);
  console.log('** points 333*** 33', points)
  moveMouse(points);
};
