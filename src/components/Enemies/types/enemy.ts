import type { Dir, NodeName, NodeTypes } from '@/types/main';

export interface IEnemyTank {
   img: string;
   imgMob: string;
   imgHit: string;
   imgHitMob: string;
   dir: Dir;
   level: number;
   hits: number;
   coord: [x: number, y: number];
   coordMob: [x: number, y: number];
   node: NodeName;
   countHit: number;
   type: NodeTypes;
}
