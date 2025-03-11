import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
} from '@/constants/init';

export function getCoordCell(x: number, y: number, isMobile: boolean) {
   const blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
   const blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
   const cellYKey = isMobile
      ? ((Math.floor(y / blockHeight) * blockHeight) / 44) * 100
      : Math.floor(y / blockHeight) * blockHeight;
   const cellY = Math.floor(y / blockHeight) * blockHeight;
   const numCellY = Math.floor(y / blockHeight);
   const cellX = Math.floor(x / blockWidth) * blockWidth;
   const numCellX = Math.floor(x / blockWidth);
   return { numCellY, numCellX, cellX, cellY, cellYKey };
}
