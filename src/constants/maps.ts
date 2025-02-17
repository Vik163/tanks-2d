import block_concrete_1 from '@/assets/images/maps/block_concrete_1.jpg';
import block_concrete_2 from '@/assets/images/maps/block_concrete_2.jpg';
import block_bricks_1 from '@/assets/images/maps/block_bricks_1.jpg';
import block_bricks_2 from '@/assets/images/maps/block_bricks_2.png';
import headquarters from '@/assets/images/maps/headquarters.png';
import placeStart from '@/assets/images/maps/place_start.png';

export const arrSrcImg = [
   block_bricks_1,
   block_concrete_1,
   block_concrete_2,
   block_bricks_2,
   headquarters,
   placeStart,
];

export const map_1 = {
   '0': [
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [150, 0],
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [200, 0],
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [250, 0],
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [600, 0],
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [650, 0],
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [700, 0],
      },
      {
         coord: [900, 0],
         countHit: 0,
         link: placeStart,
         name: 'placeStart',
         type: 'start',
      },
   ],
   '50': [
      {
         coord: [900, 50],
         countHit: 0,
         link: placeStart,
         name: 'placeStart',
         type: 'start',
      },
      {
         name: 'block_bricks_1',
         link: block_bricks_1,
         countHit: 0,
         type: 'bricks',
         coord: [700, 50],
      },
   ],
};
