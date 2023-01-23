import { mouse, Point, straightTo } from '@nut-tree/nut-js';

export const drawRectangle = async ({ height, width }) => {
  const { x: currentPosX, y: currentPosY } = await mouse.getPosition();

  await mouse.drag(straightTo(new Point(currentPosX + width, currentPosY)));
  await mouse.drag(
    straightTo(new Point(currentPosX + width, currentPosY + height))
  );
  await mouse.drag(straightTo(new Point(currentPosX, currentPosY + height)));
  await mouse.drag(straightTo(new Point(currentPosX, currentPosY)));
};
