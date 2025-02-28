import block_concrete_2 from '@/assets/images/maps/block_concrete_2.jpg';
import block_bricks_1 from '@/assets/images/maps/block_bricks_2.png';
import headquarters from '@/assets/images/maps/headquarters.png';
import placeStart from '@/assets/images/maps/place_start.png';
import block_bricks_1_hit_1 from '@/assets/images/maps/block_bricks_2_hit_1.png';
import del_block_bricks_2 from '@/assets/images/maps/del_block_bricks_2.png';
import type { MapGame, PlacesStart } from '@/types/map';

export const placesStartMap_1: PlacesStart = [
   {
      coord: [900, 0],
      coordMob: [396, 0],
      countHit: 0,
      link: placeStart,
      part: 'map',
      nameId: 'placeStart',
      type: 'placeStart',
   },
   {
      coord: [400, 50],
      coordMob: [176, 22],
      countHit: 0,
      link: placeStart,
      part: 'map',
      type: 'placeStart',
      nameId: 'placeStart',
   },
   {
      part: 'map',
      link: placeStart,
      countHit: 0,
      type: 'placeStart',
      coord: [50, 150],
      coordMob: [22, 0],
      nameId: 'placeStart',
   },
   {
      part: 'map',
      link: placeStart,
      countHit: 0,
      type: 'placeStart',
      coord: [850, 150],
      coordMob: [374, 66],
      nameId: 'placeStart',
   },
   {
      coord: [550, 750],
      coordMob: [242, 330],
      countHit: 0,
      link: placeStart,
      part: 'map',
      type: 'placeMyStart',
      nameId: 'placeStart',
   },
];

export const map_1: MapGame = {
   '0': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 0],
         coordMob: [66, 0],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [200, 0],
         coordMob: [88, 0],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 0],
         coordMob: [110, 0],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [600, 0],
         coordMob: [264, 0],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 0],
         coordMob: [286, 0],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [700, 0],
         coordMob: [308, 0],
      },
   ],
   '50': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 50],
         coordMob: [198, 22],
      },
   ],
   '100': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [0, 100],
         coordMob: [0, 44],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [50, 100],
         coordMob: [22, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [100, 100],
         coordMob: [44, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 100],
         coordMob: [66, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 100],
         coordMob: [154, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [400, 100],
         coordMob: [176, 44],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [450, 100],
         coordMob: [198, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [500, 100],
         coordMob: [220, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 100],
         coordMob: [242, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 100],
         coordMob: [330, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [800, 100],
         coordMob: [352, 44],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [850, 100],
         coordMob: [374, 44],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [900, 100],
         coordMob: [396, 44],
      },
   ],
   '150': [
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [0, 150],
         coordMob: [0, 66],
      },

      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 150],
         coordMob: [66, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [200, 150],
         coordMob: [88, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 150],
         coordMob: [110, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 150],
         coordMob: [198, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 150],
         coordMob: [286, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [700, 150],
         coordMob: [308, 66],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 150],
         coordMob: [330, 66],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [900, 150],
         coordMob: [396, 66],
      },
   ],
   '200': [
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [200, 200],
         coordMob: [88, 88],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 200],
         coordMob: [110, 88],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 200],
         coordMob: [198, 88],
      },

      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 200],
         coordMob: [286, 88],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [700, 200],
         coordMob: [308, 88],
      },
   ],
   '250': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 250],
         coordMob: [110, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 250],
         coordMob: [154, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [400, 250],
         coordMob: [176, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 250],
         coordMob: [198, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [500, 250],
         coordMob: [220, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 250],
         coordMob: [242, 110],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 250],
         coordMob: [286, 110],
      },
   ],
   '300': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 300],
         coordMob: [110, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [300, 300],
         coordMob: [132, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 300],
         coordMob: [154, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 300],
         coordMob: [198, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 300],
         coordMob: [242, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [600, 300],
         coordMob: [264, 132],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 300],
         coordMob: [286, 132],
      },
   ],
   '350': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [100, 350],
         coordMob: [44, 154],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 350],
         coordMob: [66, 154],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 350],
         coordMob: [330, 154],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [800, 350],
         coordMob: [352, 154],
      },
   ],
   '400': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [0, 400],
         coordMob: [0, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [50, 400],
         coordMob: [22, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [100, 400],
         coordMob: [44, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 400],
         coordMob: [66, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [200, 400],
         coordMob: [88, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 400],
         coordMob: [110, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [300, 400],
         coordMob: [132, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 400],
         coordMob: [154, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [400, 400],
         coordMob: [176, 176],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [450, 400],
         coordMob: [198, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [500, 400],
         coordMob: [220, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 400],
         coordMob: [242, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [600, 400],
         coordMob: [264, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 400],
         coordMob: [286, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [700, 400],
         coordMob: [308, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 400],
         coordMob: [330, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [800, 400],
         coordMob: [352, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [850, 400],
         coordMob: [374, 176],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [900, 400],
         coordMob: [396, 176],
      },
   ],
   '450': [
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [350, 450],
         coordMob: [154, 198],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [450, 450],
         coordMob: [198, 198],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [550, 450],
         coordMob: [242, 198],
      },
   ],
   '500': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 500],
         coordMob: [66, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [200, 500],
         coordMob: [88, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [250, 500],
         coordMob: [110, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [300, 500],
         coordMob: [132, 220],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [350, 500],
         coordMob: [154, 220],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [550, 500],
         coordMob: [242, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [600, 500],
         coordMob: [264, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [650, 500],
         coordMob: [286, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [700, 500],
         coordMob: [308, 220],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 500],
         coordMob: [330, 220],
      },
   ],
   '550': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 550],
         coordMob: [66, 242],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 550],
         coordMob: [154, 242],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 550],
         coordMob: [242, 242],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 550],
         coordMob: [330, 242],
      },
   ],
   '600': [
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [50, 600],
         coordMob: [22, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [100, 600],
         coordMob: [44, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [150, 600],
         coordMob: [66, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [300, 600],
         coordMob: [132, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [350, 600],
         coordMob: [154, 264],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [400, 600],
         coordMob: [176, 264],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [450, 600],
         coordMob: [198, 264],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [500, 600],
         coordMob: [220, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [550, 600],
         coordMob: [242, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [600, 600],
         coordMob: [264, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [750, 600],
         coordMob: [330, 264],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [800, 600],
         coordMob: [352, 264],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [850, 600],
         coordMob: [374, 264],
      },
   ],
   '650': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [50, 650],
         coordMob: [22, 286],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [100, 650],
         coordMob: [44, 286],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [800, 650],
         coordMob: [352, 286],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [850, 650],
         coordMob: [374, 286],
      },
   ],
   '700': [
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [0, 700],
         coordMob: [0, 308],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [50, 700],
         coordMob: [22, 308],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [300, 700],
         coordMob: [132, 308],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [400, 700],
         coordMob: [176, 308],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [450, 700],
         coordMob: [198, 308],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [500, 700],
         coordMob: [220, 308],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [600, 700],
         coordMob: [264, 308],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [850, 700],
         coordMob: [374, 308],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [900, 700],
         coordMob: [396, 308],
      },
   ],
   '750': [
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [0, 750],
         coordMob: [0, 330],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [50, 750],
         coordMob: [22, 330],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [300, 750],
         coordMob: [132, 330],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [400, 750],
         coordMob: [176, 330],
      },
      {
         part: 'map',
         link: headquarters,
         countHit: 0,
         nameId: 'headquarters',
         type: 'headquarters',
         coord: [450, 750],
         coordMob: [198, 330],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [500, 750],
         coordMob: [220, 330],
      },
      {
         part: 'map',
         nameId: 'block_concrete_2',
         link: block_concrete_2,
         countHit: 0,
         type: 'concrete',
         coord: [600, 750],
         coordMob: [264, 330],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [850, 750],
         coordMob: [374, 330],
      },
      {
         part: 'map',
         nameId: 'block_bricks_1',
         link: block_bricks_1,
         linkHit1: block_bricks_1_hit_1,
         linkDel: del_block_bricks_2,
         countHit: 0,
         type: 'bricks',
         coord: [900, 750],
         coordMob: [396, 330],
      },
   ],
};
