export interface KeysEvents {
   isDown: (key: string) => { angle: number; status: boolean };
   isUp: (key: string) => boolean;
}

export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
