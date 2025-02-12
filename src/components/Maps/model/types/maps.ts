export interface InfoBlock {
   link: string;
   name: string;
   type: string;
}

export interface Block {
   link: string | undefined;
   name: string | undefined;
   countHit: number;
   type: string | undefined;
   coord: number[];
}

export type MapBlock = Record<string, Block>;

export interface Row {
   [x: string]: MapBlock[];
}

export type MapGame = Row[];
