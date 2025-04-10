import fire_2 from '@/assets/images/blows/fire_2.png';
import fire_1 from '@/assets/images/blows/fire_1.png';
import fire from '@/assets/images/blows/fire.png';
import { ShootTank } from '../../../types/shoot';

export const shootTank: ShootTank = {
   fireLink: [fire_2, fire, fire_1],
   coord: [0, 0],
   node: 'fire',
};
