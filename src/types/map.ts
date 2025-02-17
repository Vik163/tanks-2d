export interface Block {
   link: string | undefined;
   name: string | undefined;
   countHit: number;
   type: string | undefined;
   coord: number[];
}

export interface MapGame {
   [x: string]: Block[];
}
