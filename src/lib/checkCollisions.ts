import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { map_1 } from '@/constants/maps';

export function checkCollisions(key: string, x: number, y: number) {
   console.log('x:', x);
   console.log('y:', y);

   const { cellX, cellY } = getCoordCell(x, y);
   if (key === 'UP') {
      if (
         y > 0
         //  &&
         // map_1[cellY - BLOCK_HEIGHT] &&
         // !map_1[cellY - BLOCK_HEIGHT].some(
         //    (bl) => bl.coord[0] === cellX && bl.type !== 'placeStart',
         // )
      ) {
         return true;
      }
   }
   if (key === 'DOWN') {
      if (
         y < CANVAS_HEIGHT - BLOCK_HEIGHT &&
         map_1[cellY + BLOCK_HEIGHT] &&
         !map_1[cellY + BLOCK_HEIGHT].some(
            (bl) => bl.coord[0] === cellX && bl.type !== 'placeStart',
         )
      )
         return true;
   }
   if (
      key === 'RIGHT' &&
      !map_1[cellY].some(
         (bl) =>
            bl.coord[0] === cellX + BLOCK_WIDTH && bl.type !== 'placeStart',
      )
   ) {
      if (x < CANVAS_WIDTH - BLOCK_WIDTH) return true;
   }
   if (key === 'LEFT') {
      if (
         x > 0 &&
         !map_1[cellY].some(
            (bl) =>
               bl.coord[0] === cellX - BLOCK_WIDTH && bl.type !== 'placeStart',
         )
      )
         return true;
   }
   return false;
}

export function getCoordCell(x: number, y: number) {
   const cellY = Math.floor(y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
   const cellX = Math.floor(x / BLOCK_WIDTH) * BLOCK_WIDTH;
   return { cellX, cellY };
}
