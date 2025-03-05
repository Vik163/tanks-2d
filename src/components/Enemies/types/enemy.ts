import type { Dir } from '@/types/main';

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
}
