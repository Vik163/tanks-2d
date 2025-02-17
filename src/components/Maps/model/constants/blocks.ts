import { InfoBlock } from '../types/maps';
import block_concrete_1 from '@/assets/images/maps/block_concrete_1.jpg';
import block_concrete_2 from '@/assets/images/maps/block_concrete_2.jpg';
import block_bricks_1 from '@/assets/images/maps/block_bricks_1.jpg';
import block_bricks_2 from '@/assets/images/maps/block_bricks_2.png';
import headquarters from '@/assets/images/maps/headquarters.png';
import placeStart from '@/assets/images/maps/place_start.png';

export const mapsBlocks: InfoBlock[] = [
   {
      link: block_concrete_1,
      name: 'block_concrete_1',
      type: 'concrete',
   },
   {
      link: block_concrete_2,
      name: 'block_concrete_2',
      type: 'concrete',
   },
   {
      link: block_bricks_1,
      name: 'block_bricks_1',
      type: 'bricks',
   },
   {
      link: block_bricks_2,
      name: 'block_bricks_2',
      type: 'bricks',
   },
   {
      link: placeStart,
      name: 'placeStart',
      type: 'placeStart',
   },
   {
      link: headquarters,
      name: 'headquarters',
      type: 'headquarters',
   },
];
