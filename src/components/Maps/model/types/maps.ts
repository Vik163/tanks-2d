import type { NodeName, NodeTypes } from '@/types/main';

export interface InfoBlock {
   link: string | undefined;
   linkHit1?: string | undefined;
   linkHit2?: string | undefined;
   linkDel?: string | undefined;
   node: NodeName;
   nameId?: string;
   countHit: number;
   type: NodeTypes;
   coord: number[];
}
