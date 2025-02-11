import { MapsBlocks } from '../types/maps';
import block_concrete_1 from '@/assets/images/maps/block_concrete_1.jpg';
import block_concrete_2 from '@/assets/images/maps/block_concrete_2.jpg';
import block_bricks_1 from '@/assets/images/maps/block_bricks_1.jpg';
import block_bricks_2 from '@/assets/images/maps/block_bricks_2.png';
import headquarters from '@/assets/images/maps/headquarters.png';
import placeStart from '@/assets/images/maps/place_start.png';
import enemyTank_1 from '@/assets/images/maps/enemy_light_tank_1.png';
import enemyTank_2 from '@/assets/images/maps/enemy_light_tank_2.png';

export const mapsBlocks: MapsBlocks[] = [
   {
      link: block_concrete_1,
      name: 'block_concrete_1',
   },
   {
      link: block_concrete_2,
      name: 'block_concrete_2',
   },
   {
      link: block_bricks_1,
      name: 'block_bricks_1',
   },
   {
      link: block_bricks_2,
      name: 'block_bricks_2',
   },
   {
      link: placeStart,
      name: 'placeStart',
   },
   {
      link: headquarters,
      name: 'headquarters',
   },
   {
      link: enemyTank_1,
      name: 'enemyTank_1',
   },
   {
      link: enemyTank_2,
      name: 'enemyTank_2',
   },
];
