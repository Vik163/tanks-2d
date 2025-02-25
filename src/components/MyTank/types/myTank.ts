import type { Dir } from '@/types/main';

export interface IMyTank {
   img: string;
   imgHit: string;
   stars: number;
   dir: Dir;
   level: number;
   hits: number;
   coord: [x: number, y: number];
}
