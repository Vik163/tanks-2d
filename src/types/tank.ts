import type { Dir, NodeName, NodeTypes } from '@/types/main';

export interface Tank {
   img: string;
   imgMob: string;
   imgHit: string;
   stars?: number;
   node: NodeName;
   type: NodeTypes;
   dir: Dir;
   level: number;
   lives: number;
   hits: number;
   coord: [x: number, y: number];
   coordMob: [x: number, y: number];
}
