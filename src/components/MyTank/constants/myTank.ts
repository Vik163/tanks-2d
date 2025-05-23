import tank from '@/assets/images/tanks/my_light_tank_aura.png';
import tankMob from '@/assets/images/tanks/my_light_tank_aura_mobile.png';
import tankHit from '@/assets/images/tanks/my_light_tank_aura_hit.png';
import type { Tank } from '../../../types/tank';

export const myTank: Tank = {
   img: tank,
   imgMob: tankMob,
   imgHit: tankHit,
   dir: 'UP',
   stars: 0,
   level: 1,
   hits: 0,
   lives: 3,
   coord: [550, 751],
   coordMob: [242, 330],
   node: 'tank',
   type: 'light',
};
