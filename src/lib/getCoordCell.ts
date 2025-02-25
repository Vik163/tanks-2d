import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/constants/init';

export function getCoordCell(x: number, y: number) {
   const cellY = Math.floor(y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
   const cellX = Math.floor(x / BLOCK_WIDTH) * BLOCK_WIDTH;
   return { cellX, cellY };
}
