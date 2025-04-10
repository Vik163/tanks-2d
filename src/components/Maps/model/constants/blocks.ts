import { InfoBlock } from '../types/maps';
import block_concrete_2 from '@/assets/images/maps/block_concrete_2.jpg';
import block_bricks_2 from '@/assets/images/maps/block_bricks_2.png';
import headquarters from '@/assets/images/maps/headquarters.png';
import placeStart from '@/assets/images/maps/place_start.png';

export const mapsBlocks: InfoBlock[] = [
   {
      link: block_concrete_2,
      nameId: 'block_concrete_2',
      type: 'concrete',
      node: 'map',
      countHit: 0,
      coord: [0, 0],
   },

   {
      link: block_bricks_2,
      nameId: 'block_bricks_2',
      type: 'bricks',
      node: 'map',
      countHit: 0,
      coord: [0, 0],
   },
   {
      link: placeStart,
      nameId: 'placeStart',
      type: 'placeStart',
      node: 'map',
      countHit: 0,
      coord: [0, 0],
   },
   {
      link: headquarters,
      nameId: 'headquarters',
      type: 'headquarters',
      node: 'map',
      countHit: 0,
      coord: [0, 0],
   },
];
