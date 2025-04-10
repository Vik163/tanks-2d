import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   TANK_HEIGHT,
   TANK_HEIGHT_MOBILE,
   TANK_WIDTH,
   TANK_WIDTH_MOBILE,
} from '@/constants/init';
import { CoordCell } from '@/types/main';

export const getCoord = (num: number, block: number) =>
   Math.floor(Math.ceil(num) / block) * block;

export function getCoordCell(
   x: number,
   y: number,
   isMobile: boolean,
): CoordCell {
   const blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
   const blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
   const tankWidth = isMobile ? TANK_WIDTH_MOBILE : TANK_WIDTH;
   const tankHeight = isMobile ? TANK_HEIGHT_MOBILE : TANK_HEIGHT;

   const cellYKey = isMobile
      ? (getCoord(y, blockHeight) / 44) * 100
      : getCoord(y, blockHeight);
   const cellsX = {
      start: getCoord(x, blockWidth),
      end: getCoord(x + tankWidth, blockWidth),
   };
   const cellsY = {
      start: getCoord(y, blockHeight),
      end: getCoord(y + tankHeight, blockHeight),
   };
   const numCellY = Math.floor(y / blockHeight);
   const numCellX = Math.floor(x / blockWidth);

   return { numCellY, numCellX, cellsX, cellsY, cellYKey };
}
