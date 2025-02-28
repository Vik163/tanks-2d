import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   CANVAS_HEIGHT,
   CANVAS_HEIGHT_MOBILE,
   CANVAS_WIDTH,
   CANVAS_WIDTH_MOBILE,
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
   isMobile: boolean,
): Block | boolean {
   const blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
   const cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
   const cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
   const blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
   // Танк и огонь разные проверки (у танка плавная остановка огонь немного заходит на блок)
   const { cellX, cellYKey } = getCoordCell(x, y, isMobile);
   if (dir === 'UP') {
      let block: BlockCollisions;

      if (
         (type === 'fire' &&
            map_1[cellYKey] &&
            map_1[cellYKey].some((bl) => {
               const coord = isMobile ? bl.coordMob : bl.coord;
               if (
                  coord[0] === cellX &&
                  y < coord[1] + blockHeight - 10 &&
                  bl.countHit < 2
               ) {
                  block = bl;
                  return true;
               }

               return false;
            })) ||
         (type === 'tank' &&
            map_1[cellYKey - BLOCK_HEIGHT] &&
            map_1[cellYKey - BLOCK_HEIGHT].some((bl) => {
               const coord = isMobile ? bl.coordMob : bl.coord;

               if (coord[0] === cellX && bl.countHit < 2) {
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
         (map_1[cellYKey + BLOCK_HEIGHT] &&
            map_1[cellYKey + BLOCK_HEIGHT].some((bl) => {
               const coord = isMobile ? bl.coordMob : bl.coord;

               if (
                  type === 'fire'
                     ? coord[0] === cellX &&
                       y > coord[1] - blockHeight + 15 &&
                       y < coord[1] - blockHeight + 20 &&
                       bl.countHit < 2
                     : coord[0] === cellX && bl.countHit < 2
               ) {
                  block = bl;
                  return true;
               }
               return false;
            })) ||
         y >= cnvHeight - blockHeight
      )
         return block || true;
   }
   if (dir === 'RIGHT') {
      let block: BlockCollisions;

      if (
         map_1[cellYKey].some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;

            if (
               type === 'fire'
                  ? x > coord[0] - blockWidth + 10 &&
                    x < coord[0] - blockWidth + 15 &&
                    bl.countHit < 2
                  : coord[0] === cellX + blockWidth && bl.countHit < 2
            ) {
               block = bl;
               return true;
            }
            return false;
         }) ||
         x >= cnvWidth - blockWidth
      )
         return block || true;
   }
   if (dir === 'LEFT') {
      let block: BlockCollisions;

      if (
         map_1[cellYKey].some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;

            if (
               type === 'fire'
                  ? x > coord[0] + blockWidth - 15 &&
                    x < coord[0] + blockWidth - 10 &&
                    bl.countHit < 2
                  : coord[0] === cellX - blockWidth && bl.countHit < 2
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
