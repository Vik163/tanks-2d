import { Enemy } from '@/components/Enemies/Enemy';
import { MyTank } from '@/components/MyTank/MyTank';
import { Block } from './map';

export interface CnvProps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
}

export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Directions = ['DOWN', 'LEFT', 'RIGHT', 'UP'];

export type NodeTypes =
   | 'bricks'
   | 'concrete'
   | 'placeStart'
   | 'placeMyStart'
   | 'headquarters'
   | 'light'
   | 'middle'
   | 'hard';

export type NodeName = 'map' | 'tank' | 'myTank' | 'fire';

export interface KeysEvents {
   isDown: (key: string) => { angle: number; dir: Dir; status: boolean };
   isUp: (key: string) => boolean;
}

export interface CoordCell {
   numCellY: number;
   numCellX: number;
   cellsX: { start: number; end: number };
   cellsY: { start: number; end: number };
   cellYKey: number;
}

export type NodesMove = (Enemy | MyTank)[];
export type NodeCollisions = Enemy | MyTank | Block | boolean;
