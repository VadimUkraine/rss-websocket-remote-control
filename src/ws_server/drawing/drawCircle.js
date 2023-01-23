import { centerOf, mouse, Point, Region } from '@nut-tree/nut-js';

export const convertIntoRadians = (deg) => {
  const radians = (deg * Math.PI) / 180;

  return radians;
};

export const drawCircle = async ({ radius }) => {
  const { x: currentPosX, y: currentPosY } = await mouse.getPosition();
  const diameter = radius * 2;

  const fullCircleDeg = 360;
  const angleCorrection = convertIntoRadians(-90);
  const path = [];

  const region = new Region(
    currentPosX - radius,
    currentPosY,
    diameter,
    diameter
  );
  const centerPoint = await centerOf(region);

  for (let angle = 0; angle < fullCircleDeg; angle += 0.33) {
    const x =
      centerPoint.x +
      radius * Math.cos(convertIntoRadians(angle) + angleCorrection);
    const y =
      centerPoint.y +
      radius * Math.sin(convertIntoRadians(angle) + angleCorrection);

    const point = new Point(x, y);

    path.push(point);
  }

  await mouse.drag(path);
};
