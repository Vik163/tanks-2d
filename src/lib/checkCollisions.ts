import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   CANVAS_HEIGHT,
   CANVAS_HEIGHT_MOBILE,
   CANVAS_WIDTH,
   CANVAS_WIDTH_MOBILE,
   TANK_HEIGHT,
   TANK_HEIGHT_MOBILE,
   TANK_WIDTH,
   TANK_WIDTH_MOBILE,
} from '@/constants/init';
import { map_1 } from '@/constants/maps';
import type { NodeCollisions, NodeName, NodesMove } from '@/types/main';
import { getCoord, getCoordCell } from './getCoordCell';
import type { Block } from '@/types/map';

export function checkCollisions(
   dir: string,
   x: number,
   y: number,
   nodeType: NodeName,
   isMobile: boolean,
   nodesMove?: NodesMove,
): NodeCollisions {
   const tankHeight = isMobile ? TANK_HEIGHT_MOBILE : TANK_HEIGHT;
   const blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
   const cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
   const cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
   const blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
   const tankWidth = isMobile ? TANK_WIDTH_MOBILE : TANK_WIDTH;
   // Танк и огонь разные проверки (у танка плавная остановка огонь немного заходит на блок)
   const { cellsX, cellsY } = getCoordCell(x, y, isMobile);
   let block: NodeCollisions = false;

   const map: Block[] = JSON.parse(localStorage.getItem('map_1')!) || map_1;

   const checkMap = (
      coordNode: number,
      coord: number,
      bl: Block,
      shoot: boolean,
      tank: boolean,
   ) => {
      const checkMap =
         coordNode === coord &&
         bl.countHit < 2 &&
         (nodeType === 'fire' ? shoot : tank);

      if (checkMap) {
         // console.log(
         //    'DOWN:',
         //    cellsX.start,
         //    coord[0],
         //    y + tankHeight,
         //    coord[1],
         // );

         block = bl;
         return true;
      }
   };
   //! === UP =================================
   if (dir === 'UP') {
      if (
         map.some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;
            const checkMapFire = //* -- выстрел - проверка по карте
               y > coord[1] + blockHeight - 18 &&
               y < coord[1] + blockHeight - 16;
            const checkMapTank = //* -- танки - проверка по карте
               y >= coord[1] + blockHeight && y < coord[1] + blockHeight + 1;

            const checkMap =
               coord[0] === cellsX.start &&
               bl.countHit < 2 &&
               (nodeType === 'fire' ? checkMapFire : checkMapTank);

            if (checkMap) {
               // console.log('UP:', cellsX.start, coord[0], y, coord[1]);

               block = bl;
               return true;
            }

            return false;
         }) ||
         (nodesMove &&
            nodesMove.some((node) => {
               const nodeCellX = getCoord(node.X, blockWidth);
               const nodeCellY = getCoord(node.Y, blockHeight);
               const checkMapTank = //* -- танки - проверка по карте
                  y >= nodeCellY + blockHeight &&
                  y < nodeCellY + blockHeight + 1;
               // console.log('odeCellY:', cellsY.start, nodeCellY + blockHeight);

               if (
                  nodeCellX === cellsX.start &&
                  node.countHit < 2 &&
                  checkMapTank
               ) {
                  block = node;
                  return true;
               }

               return false;
            })) ||
         y <= 1
      )
         return block || true;
   }

   //! === DOWN =================================
   if (dir === 'DOWN') {
      if (
         //* -- проверка по карте
         map.some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;
            const checkMapFire = //* -- выстрел - проверка по карте
               y > coord[1] - blockHeight + 16 &&
               y < coord[1] - blockHeight + 18;
            const checkMapTank = //* -- танки - проверка по карте
               y + tankHeight <= coord[1] - 1 && y + tankHeight > coord[1] - 2;

            return (
               checkMap(
                  coord[0],
                  cellsX.start,
                  bl,
                  checkMapFire,
                  checkMapTank,
               ) || false
            );

            // const checkMap =
            //    coord[0] === cellsX.start &&
            //    bl.countHit < 2 &&
            //    (nodeType === 'fire' ? checkMapFire : checkMapTank);

            // if (checkMap) {
            //    // console.log(
            //    //    'DOWN:',
            //    //    cellsX.start,
            //    //    coord[0],
            //    //    y + tankHeight,
            //    //    coord[1],
            //    // );

            //    block = bl;
            //    return true;
            // }
         }) ||
         (nodesMove &&
            nodesMove.some((node) => {
               // }
               const nodeCellX = getCoord(node.X, blockWidth);
               const nodeCellY = getCoord(node.Y, blockHeight);
               const checkMapTank = //* -- танки - проверка по карте
                  y + tankHeight <= nodeCellY - 1 &&
                  y + tankHeight > nodeCellY - 2;
               // console.log('d:', Math.ceil(node.X), nodeCellX, cellsX.start);
               if (
                  nodeCellX === cellsX.start &&
                  node.countHit < 2 &&
                  checkMapTank
               ) {
                  block = node;
                  return true;
               }

               return false;
            })) ||
         y >= cnvHeight - blockHeight
      )
         return block || true;
   }

   //! === RIGHT =================================
   if (dir === 'RIGHT') {
      if (
         map.some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;
            const checkMapFire = //* -- выстрел - проверка по карте
               x < coord[0] - blockWidth + 18 && x > coord[0] - blockWidth + 16;
            const checkMapTank = //* -- танки - проверка по карте
               x + tankWidth <= coord[0] - 1 && x + tankWidth > coord[0] - 2;

            const checkMap =
               coord[1] === cellsY.start &&
               bl.countHit < 2 &&
               (nodeType === 'fire' ? checkMapFire : checkMapTank);

            if (checkMap) {
               // console.log(
               //    'RIGHT:',
               //    coord[1],
               //    cellsY.start,
               //    coord[0],
               //    x + tankWidth,
               // );

               block = bl;
               return true;
            }
            return false;
         }) ||
         (nodesMove &&
            nodesMove.some((node) => {
               // }
               const nodeCellX = getCoord(node.X, blockWidth);
               const nodeCellY = getCoord(node.Y, blockHeight);
               const checkMapTank = //* -- танки - проверка по карте
                  x + tankWidth <= nodeCellX - 1 &&
                  x + tankWidth > nodeCellX - 2;
               // console.log('d:', Math.ceil(node.X), nodeCellX, cellsX.start);
               if (
                  (nodeCellY === cellsY.start &&
                     node.countHit < 2 &&
                     checkMapTank) ||
                  (nodeCellY === cellsY.start && cellsX.start === nodeCellX)
               ) {
                  block = node;
                  return true;
               }

               return false;
            })) ||
         x >= cnvWidth - blockWidth
      )
         return block || true;
   }

   //! === LEFT =================================
   if (dir === 'LEFT') {
      if (
         map.some((bl) => {
            const coord = isMobile ? bl.coordMob : bl.coord;
            const checkMapFire = //* -- выстрел - проверка по карте
               x < coord[0] + blockWidth - 16 && x > coord[0] + blockWidth - 18;
            const checkMapTank = //* -- танки - проверка по карте
               x >= coord[0] + blockWidth && x < coord[0] + blockWidth + 1;

            const checkMap =
               coord[1] === cellsY.start &&
               bl.countHit < 2 &&
               (nodeType === 'fire' ? checkMapFire : checkMapTank);

            if (checkMap) {
               // console.log('LEFT:', coord[1], cellsY.start, x, coord[0]);

               block = bl;
               return true;
            }
            return false;
         }) ||
         (nodesMove &&
            nodesMove.some((node) => {
               // }
               const nodeCellX = getCoord(node.X, blockWidth);
               const nodeCellY = getCoord(node.Y, blockHeight);
               const checkMapTank = //* -- танки - проверка по карте
                  x >= nodeCellX + blockWidth && x < nodeCellX + blockWidth + 1;
               // console.log('d:', Math.ceil(node.X), nodeCellX, cellsX.start);
               if (
                  (nodeCellY === cellsY.start &&
                     node.countHit < 2 &&
                     checkMapTank) ||
                  (nodeCellY === cellsY.start && cellsX.start === nodeCellX)
               ) {
                  block = node;
                  return true;
               }

               return false;
            })) ||
         x <= 1
      )
         return block || true;
   }
   return false;
}
// export function checkCollisions(
//    dir: string,
//    x: number,
//    y: number,
//    nodeType: NodeName,
//    isMobile: boolean,
//    nodesMove?: NodesMove,
// ): NodeCollisions {
//    const blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
//    const cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
//    const cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
//    const blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
//    // Танк и огонь разные проверки (у танка плавная остановка огонь немного заходит на блок)
//    const { cellYKey, cellsX, cellsY } = getCoordCell(x, y, isMobile);
//    let block: NodeCollisions = false;

//    //! === UP =================================
//    if (dir === 'UP') {
//       // console.log('y:', y);
//       // console.log('x:', x);
//       const checkCellFromType = nodeType === 'tank' ? y <= cellYKey + 2 : true;

//       if (
//          (nodeType === 'fire' && //* -- выстрел - проверка по карте
//             map_1[cellYKey] &&
//             map_1[cellYKey].some((bl) => {
//                const coord = isMobile ? bl.coordMob : bl.coord;
//                if (
//                   coord[0] === cellsX.start &&
//                   y < coord[1] + blockHeight - 10 &&
//                   bl.countHit < 2
//                ) {
//                   block = bl;
//                   return true;
//                }

//                return false;
//             })) ||
//          (nodeType === 'tank' && //* -- танки - проверка по карте
//             map_1[cellYKey - BLOCK_HEIGHT] &&
//             map_1[cellYKey - BLOCK_HEIGHT].some((bl) => {
//                const coord = isMobile ? bl.coordMob : bl.coord;

//                if (
//                   coord[0] === cellsX.start &&
//                   bl.countHit < 2 &&
//                   checkCellFromType
//                ) {
//                   block = bl;
//                   return true;
//                }

//                return false;
//             })) ||
//          (nodeType === 'tank' && //* -- танки - проверка столкновений
//             nodesMove &&
//             nodesMove.some((node) => {
//                const nodeCellX = getCoord(node.X, blockWidth);
//                const nodeCellY = getCoord(node.Y, blockHeight);

//                const checkNodeFromType =
//                   cellsY.start <= nodeCellY + blockHeight - 1;
//                if (
//                   nodeCellX === cellsX.start &&
//                   node.countHit < 2 &&
//                   checkNodeFromType
//                ) {
//                   // console.log('up');

//                   block = node;
//                   return true;
//                }

//                return false;
//             })) ||
//          y <= 1
//       )
//          return block || true;
//    }

//    //! === DOWN =================================
//    if (dir === 'DOWN') {
//       if (
//          (map_1[cellYKey + BLOCK_HEIGHT] && //* -- проверка по карте
//             map_1[cellYKey + BLOCK_HEIGHT].some((bl) => {
//                const coord = isMobile ? bl.coordMob : bl.coord;
//                if (
//                   nodeType === 'fire'
//                      ? coord[0] === cellsX.start &&
//                        y > coord[1] - blockHeight + 15 &&
//                        y < coord[1] - blockHeight + 20 &&
//                        bl.countHit < 2
//                      : coord[0] === cellsX.start && bl.countHit < 2
//                ) {
//                   block = bl;
//                   return true;
//                }
//                return false;
//             })) ||
//          (nodeType === 'tank' && //* -- танки - проверка столкновений
//             nodesMove &&
//             nodesMove.some((node) => {
//                // }
//                const nodeCellX = getCoord(node.X, blockWidth);
//                const nodeCellY = getCoord(node.Y, blockHeight);
//                const checkNodeFromType = cellsY.end - blockHeight >= nodeCellY;
//                if (
//                   nodeCellX === cellsX.start &&
//                   node.countHit < 2 &&
//                   checkNodeFromType
//                ) {
//                   // console.log('down');

//                   block = node;
//                   return true;
//                }

//                return false;
//             })) ||
//          y >= cnvHeight - blockHeight
//       )
//          return block || true;
//    }

//    //! === RIGHT =================================
//    if (dir === 'RIGHT') {
//       if (
//          map_1[cellYKey].some((bl) => {
//             const coord = isMobile ? bl.coordMob : bl.coord;

//             if (
//                nodeType === 'fire'
//                   ? x > coord[0] - blockWidth + 10 &&
//                     x < coord[0] - blockWidth + 15 &&
//                     bl.countHit < 2
//                   : coord[0] === cellsX.end && bl.countHit < 2
//             ) {
//                block = bl;
//                return true;
//             }
//             return false;
//          }) ||
//          x >= cnvWidth - blockWidth
//       )
//          return block || true;
//    }

//    //! === LEFT =================================
//    if (dir === 'LEFT') {
//       if (
//          map_1[cellYKey].some((bl) => {
//             const coord = isMobile ? bl.coordMob : bl.coord;
//             // в зависимости от танка разные проверки (плавная остановка myTank)
//             const checkFromType =
//                nodeType === 'tank'
//                   ? coord[0] === cellsX.start - blockWidth &&
//                     x <= coord[0] + blockWidth + 2
//                   : coord[0] === cellsX.start - blockWidth;

//             if (
//                nodeType === 'fire'
//                   ? x > coord[0] + blockWidth - 15 &&
//                     x < coord[0] + blockWidth - 10 &&
//                     bl.countHit < 2
//                   : checkFromType && bl.countHit < 2
//             ) {
//                block = bl;
//                return true;
//             }
//             return false;
//          }) ||
//          x <= 1
//       )
//          return block || true;
//    }
//    return false;
// }
