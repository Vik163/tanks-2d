import type { NodeTypes } from './main';

export interface Block {
   id: number;
   link: string | undefined;
   linkHit1?: string | undefined;
   linkHit2?: string | undefined;
   linkDel?: string | undefined;
   node: 'map';
   nameId?: string;
   countHit: number;
   type: NodeTypes;
   coord: number[];
   coordMob: number[];
}

export type PlacesStart = Block[];

export type MapGame = Block[];
// export interface MapGame {
//    [x: string]: Block[];
// }
