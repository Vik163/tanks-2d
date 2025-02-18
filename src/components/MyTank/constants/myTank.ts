import tank from '@/assets/images/tanks/my_light_tank_aura.png';
import tankHit from '@/assets/images/tanks/my_light_tank_aura_hit.png';
import type { IMyTank } from '../types/myTank';

export const myTank: IMyTank = {
   img: tank,
   imgHit: tankHit,
   stars: 0,
   level: 1,
   hits: 0,
   coord: [550, 750],
};
