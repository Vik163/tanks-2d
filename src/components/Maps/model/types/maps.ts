import { Part, TypesBlocks } from '@/types/map';

export interface InfoBlock {
   link: string | undefined;
   linkHit1?: string | undefined;
   linkHit2?: string | undefined;
   linkDel?: string | undefined;
   part: Part;
   nameId?: string;
   countHit: number;
   type: TypesBlocks;
   coord: number[];
}
