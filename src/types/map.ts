export type TypesBlocks =
   | 'bricks'
   | 'concrete'
   | 'placeStart'
   | 'headquarters'
   | undefined;

export interface Block {
   link: string | undefined;
   name: string | undefined;
   countHit: number;
   type: TypesBlocks;
   coord: number[];
}

export interface MapGame {
   [x: string]: Block[];
}
