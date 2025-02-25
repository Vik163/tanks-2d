export interface CnvProps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
}

export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface KeysEvents {
   isDown: (key: string) => { angle: number; dir: Dir; status: boolean };
   isUp: (key: string) => boolean;
}
