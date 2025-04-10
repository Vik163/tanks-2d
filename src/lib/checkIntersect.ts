import { Shoot } from '@/components/Shooting/Shoot';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/constants/init';
import { NodesMove } from '@/types/main';

export const checkIntersect = (
   coord: { x: number; y: number },
   shoots?: Shoot[],
   nodes?: NodesMove,
) => {
   const iNode =
      shoots ||
      nodes?.find(
         (s, i) =>
            !(
               s.X + s.tankWidth < coord.x ||
               s.Y + s.tankHeight < coord.y ||
               s.X > coord.x + BLOCK_WIDTH ||
               s.Y > coord.y + BLOCK_HEIGHT
            ),
      );
   return iNode;
};
