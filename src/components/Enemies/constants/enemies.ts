import { IEnemyTank } from '../types/enemy';
import enemyTankL from '@/assets/images/tanks/enemy_light_tank_1.png';
import enemyTankLM from '@/assets/images/tanks/enemy_light_tank_mobile_1.png';
import enemyTankLHM from '@/assets/images/tanks/enemy_light_tank_hit_mobile_1.png';
import enemyTankLH from '@/assets/images/tanks/enemy_light_tank_hit_1.png';
import enemyTankM from '@/assets/images/tanks/enemy_medium_tank_1.png';
import enemyTankMM from '@/assets/images/tanks/enemy_medium_tank_mobile_1.png';
import enemyTankMHM from '@/assets/images/tanks/enemy_medium_tank_hit_mobile_1.png';
import enemyTankMH from '@/assets/images/tanks/enemy_medium_tank_hit_1.png';

export const enimyLightTank: IEnemyTank = {
   img: enemyTankL,
   imgMob: enemyTankLM,
   imgHit: enemyTankLH,
   imgHitMob: enemyTankLHM,
   dir: 'DOWN',
   level: 0,
   hits: 0,
   coord: [0, 0],
   coordMob: [0, 0],
   node: 'tank',
   countHit: 0,
   type: 'light',
};

export const enimyMiddleTank: IEnemyTank = {
   img: enemyTankM,
   imgMob: enemyTankMM,
   imgHit: enemyTankMH,
   imgHitMob: enemyTankMHM,
   dir: 'DOWN',
   level: 0,
   hits: 0,
   coord: [0, 0],
   coordMob: [0, 0],
   node: 'tank',
   countHit: 0,
   type: 'middle',
};
