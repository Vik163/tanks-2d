export type TypesBlocks =
   | 'bricks'
   | 'concrete'
   | 'placeStart'
   | 'placeMyStart'
   | 'headquarters'
   | undefined;

export type Part = 'map' | 'myTank' | 'enemy';

export interface Block {
   link: string | undefined;
   linkHit1?: string | undefined;
   linkHit2?: string | undefined;
   linkDel?: string | undefined;
   part: Part;
   nameId?: string;
   countHit: number;
   type: TypesBlocks;
   coord: number[];
   coordMob: number[];
}

export type PlacesStart = Block[];

export interface MapGame {
   [x: string]: Block[];
}
