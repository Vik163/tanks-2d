import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { map_1 } from '@/constants/maps';
import { getCoordCell } from './getCoordCell';

export function checkCollisions(
   key: string,
   x: number,
   y: number,
   type: string,
) {
   // Танк и огонь разные проверки (у танка плавная остановка огонь немного заходит на блок)
   const { cellX, cellY } = getCoordCell(x, y);
   if (key === 'UP') {
      if (
         (type === 'fire' &&
            map_1[cellY] &&
            map_1[cellY].some(
               (bl) =>
                  bl.coord[0] === cellX &&
                  y < bl.coord[1] + BLOCK_HEIGHT - 10 &&
                  bl.type !== 'placeStart',
            )) ||
         (type === 'tank' &&
            map_1[cellY - BLOCK_HEIGHT] &&
            map_1[cellY - BLOCK_HEIGHT].some(
               (bl) => bl.coord[0] === cellX && bl.type !== 'placeStart',
            )) ||
         y <= 0
      )
         return true;
   }
   if (key === 'DOWN') {
      if (
         (map_1[cellY + BLOCK_HEIGHT] &&
            map_1[cellY + BLOCK_HEIGHT].some((bl) =>
               type === 'fire'
                  ? bl.coord[0] === cellX &&
                    y > bl.coord[1] - BLOCK_HEIGHT + 10 &&
                    y < bl.coord[1] - BLOCK_HEIGHT + 15 &&
                    bl.type !== 'placeStart'
                  : bl.coord[0] === cellX && bl.type !== 'placeStart',
            )) ||
         y >= CANVAS_HEIGHT - BLOCK_HEIGHT
      )
         return true;
   }
   if (key === 'RIGHT') {
      if (
         map_1[cellY].some((bl) =>
            type === 'fire'
               ? x > bl.coord[0] - BLOCK_WIDTH + 10 &&
                 x < bl.coord[0] - BLOCK_WIDTH + 15 &&
                 bl.type !== 'placeStart'
               : bl.coord[0] === cellX + BLOCK_WIDTH,
         ) ||
         x >= CANVAS_WIDTH - BLOCK_WIDTH
      )
         return true;
   }
   if (key === 'LEFT') {
      if (
         map_1[cellY].some((bl) =>
            type === 'fire'
               ? x > bl.coord[0] + BLOCK_WIDTH - 15 &&
                 x < bl.coord[0] + BLOCK_WIDTH - 10 &&
                 bl.type !== 'placeStart'
               : bl.coord[0] === cellX - BLOCK_WIDTH,
         ) ||
         x <= 0
      )
         return true;
   }
   return false;
}
