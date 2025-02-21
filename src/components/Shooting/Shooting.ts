import type { Dir, KeysEvents } from '@/types/handlerEvents';
import { Shoot } from './Shoot';
import { myTank } from '../MyTank/constants/myTank';
import { soundsLinks } from '@/constants/sounds';
import { handlerEventsAndAngle } from '@/lib/handlerEvents';
import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import type { MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';
import { checkCollisions } from '@/lib/checkCollisions';

export class Shooting {
   shooting: Shoot[];
   timer: number;
   keys: KeysEvents;
   tankX: number;
   tankY: number;
   _soundTankFire: HTMLAudioElement;
   ctx: CanvasRenderingContext2D;
   dir: Dir;
   _coordCell: { cellX: number; cellY: number };
   cnvWidth: number;
   cnvHeight: number;
   blockWidth: number;
   blockHeight: number;
   map: MapGame;
   fireX: number;
   fireY: number;
   checkCollisions: (key: string, x: number, y: number) => boolean | undefined;

   constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.shooting = [];
      this.keys = handlerEventsAndAngle();
      this.timer = 0;
      this.tankX = myTank.coord[0]; // смещаю из угла в центр
      this.tankY = myTank.coord[1];
      this._soundTankFire = new Audio(soundsLinks.tankFire);
      this.dir = 'UP';
      this._coordCell = { cellX: 0, cellY: 0 };
      this.map = map_1;
      this.fireX = myTank.coord[0];
      this.fireY = myTank.coord[1];
      this.checkCollisions = () =>
         checkCollisions('UP', this.fireX, this.fireY);
   }

   update() {
      if (this.shooting.length > 0)
         this.shooting = this.shooting.filter((shoot) => {
            const { fireX, fireY } = shoot.update();
            this.fireX = fireX;
            this.fireY = fireY;
            console.log('fireY', this.fireY);

            const isCollision = this.checkCollisions(
               'UP',
               this.fireX,
               this.fireY,
            );

            if (isCollision) {
               return true;
            }
            return false;
         });

      console.log('this.shooting:', this.shooting);

      this._createFires();
   }

   _createFires() {
      if (this.keys.isDown('SPACE').status) {
         this._soundTankFire.play();
      } else {
         this._soundTankFire.pause();
         this._soundTankFire.currentTime = 0;
      }

      if (this.keys.isDown('SPACE').status) {
         if (this.timer > 400 || this.timer === 0) {
            this.shooting.push(new Shoot(this.ctx, this.tankX, this.tankY));
            this.timer = 0;
         }
         this.timer++;
      }
   }

   _deleteFires() {}

   render() {
      if (this.shooting.length > 0)
         this.shooting.forEach((shoot) => shoot.render());
   }
}
