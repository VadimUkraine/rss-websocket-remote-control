import Jimp from 'jimp';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import { COMMANDS } from '../constants/commands.js';

const DEFAULT_SCREENSHOT_WIDTH = 200;
const DEFAULT_SCREENSHOT_HEIGHT = 200;

const getResponseMessage = (imageBase64) => {
  const stringToTrim = 'data:image/png;base64,';
  const normalizeString = imageBase64.replace(stringToTrim, '');

  return `${COMMANDS.PRINT_SCREEN} ${normalizeString}`;
};

export const makePrintScreen = async () => {
  const { x: currentPosX, y: currentPosY } = await mouse.getPosition();

  const left = currentPosX - DEFAULT_SCREENSHOT_WIDTH / 2;
  const top = currentPosY - DEFAULT_SCREENSHOT_HEIGHT / 2;
  const screenshotRegion = new Region(
    left,
    top,
    DEFAULT_SCREENSHOT_WIDTH,
    DEFAULT_SCREENSHOT_HEIGHT
  );

  const rawScreenshot = await screen.grabRegion(screenshotRegion);
  const rawScreenshotInRGB = await rawScreenshot.toRGB();

  const image = new Jimp({ ...rawScreenshotInRGB });
  const imageBase64 = await image.getBase64Async(Jimp.MIME_PNG);

  const result = getResponseMessage(imageBase64);

  return result;
};
