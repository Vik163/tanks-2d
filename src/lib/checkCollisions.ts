import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { map_1 } from '@/constants/maps';
import { getCoordCell } from './getCoordCell';
import { Block } from '@/types/map';

type BlockCollisions = Block | undefined;

export function checkCollisions(
   dir: string,
   x: number,
   y: number,
   type: string,
): Block | boolean {
   // Танк и огонь разные проверки (у танка плавная остановка огонь немного заходит на блок)
   const { cellX, cellY } = getCoordCell(x, y);
   if (dir === 'UP') {
      let block: BlockCollisions;

      if (
         (type === 'fire' &&
            map_1[cellY] &&
            map_1[cellY].some((bl) => {
               if (
                  bl.coord[0] === cellX &&
                  y < bl.coord[1] + BLOCK_HEIGHT - 10 &&
                  bl.countHit < 2
               ) {
                  block = bl;
                  return true;
               }
               return false;
            })) ||
         (type === 'tank' &&
            map_1[cellY - BLOCK_HEIGHT] &&
            map_1[cellY - BLOCK_HEIGHT].some((bl) => {
               if (bl.coord[0] === cellX && bl.countHit < 2) {
                  block = bl;
                  return true;
               }
               return false;
            })) ||
         y <= 0
      )
         return block || true;
   }
   if (dir === 'DOWN') {
      let block: BlockCollisions;

      if (
         (map_1[cellY + BLOCK_HEIGHT] &&
            map_1[cellY + BLOCK_HEIGHT].some((bl) => {
               if (
                  type === 'fire'
                     ? bl.coord[0] === cellX &&
                       y > bl.coord[1] - BLOCK_HEIGHT + 15 &&
                       y < bl.coord[1] - BLOCK_HEIGHT + 20 &&
                       bl.countHit < 2
                     : bl.coord[0] === cellX && bl.countHit < 2
               ) {
                  block = bl;
                  return true;
               }
               return false;
            })) ||
         y >= CANVAS_HEIGHT - BLOCK_HEIGHT
      )
         return block || true;
   }
   if (dir === 'RIGHT') {
      let block: BlockCollisions;

      if (
         map_1[cellY].some((bl) => {
            if (
               type === 'fire'
                  ? x > bl.coord[0] - BLOCK_WIDTH + 10 &&
                    x < bl.coord[0] - BLOCK_WIDTH + 15 &&
                    bl.countHit < 2
                  : bl.coord[0] === cellX + BLOCK_WIDTH && bl.countHit < 2
            ) {
               block = bl;
               return true;
            }
            return false;
         }) ||
         x >= CANVAS_WIDTH - BLOCK_WIDTH
      )
         return block || true;
   }
   if (dir === 'LEFT') {
      let block: BlockCollisions;

      if (
         map_1[cellY].some((bl) => {
            if (
               type === 'fire'
                  ? x > bl.coord[0] + BLOCK_WIDTH - 15 &&
                    x < bl.coord[0] + BLOCK_WIDTH - 10 &&
                    bl.countHit < 2
                  : bl.coord[0] === cellX - BLOCK_WIDTH && bl.countHit < 2
            ) {
               block = bl;
               return true;
            }
            return false;
         }) ||
         x <= 0
      )
         return block || true;
   }
   return false;
}
