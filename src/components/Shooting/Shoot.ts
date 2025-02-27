import { handlerParameters } from '@/lib/handlerParameters';
import { shootTank } from './constants/shoot';
import { ShootTank } from './types/shoot';
import { Dir, KeysEvents } from '@/types/main';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
} from '@/constants/init';

export class Shoot {
   ctx: CanvasRenderingContext2D;
   shoot: ShootTank;
   keys: KeysEvents;
   fireX: number;
   fireY: number;
   blockWidth: number;
   blockHeight: number;
   _angle: number;
   dir: Dir;
   speedFire: number;
   _timerLink: number;
   isMobile: boolean;

   constructor(
      ctx: CanvasRenderingContext2D,
      tankX: number,
      tankY: number,
      dir: Dir,
      angle: number,
      isMobile: boolean,
   ) {
      this.ctx = ctx;
      this.shoot = shootTank;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.keys = handlerParameters();
      this.fireX = tankX;
      this.fireY = tankY;
      this.dir = dir;
      this._angle = angle;
      this.speedFire = 0.9;
      this._timerLink = 0;
      this.isMobile = isMobile;
   }

   update() {
      if (this.dir === 'UP') {
         this.fireY -= this.speedFire;
      }
      if (this.dir === 'DOWN') {
         this.fireY += this.speedFire;
      }
      if (this.dir === 'RIGHT') {
         this.fireX += this.speedFire;
      }
      if (this.dir === 'LEFT') {
         this.fireX -= this.speedFire;
      }

      return { fireX: this.fireX, fireY: this.fireY };
   }

   render() {
      // изменяющийся огонь
      let link = this.shoot.fireLink[0];
      if (this._timerLink > 100) {
         link = this.shoot.fireLink[1];
      }
      if (this._timerLink <= 100) {
         link = this.shoot.fireLink[0];
      }
      if (this._timerLink === 200) {
         this._timerLink = 0;
      }

      this._timerLink++;
      const img = window.resources.get(link);

      this.ctx.save();
      // смещаю координаты из угла в центр, поворот и возврат в угол

      if (this.dir === 'UP') {
         this.ctx.translate(
            Math.round(this.fireX + this.blockWidth / 2.5) +
               this.blockWidth / 2,
            this.fireY + this.blockWidth / 2,
         );
      }
      if (this.dir === 'DOWN') {
         this.ctx.translate(
            Math.round(this.fireX - this.blockWidth / 2.5) +
               this.blockWidth / 2,
            this.fireY + this.blockWidth / 2,
         );
      }
      if (this.dir === 'RIGHT') {
         this.ctx.translate(
            Math.round(this.fireX) + this.blockWidth / 2,
            this.fireY + this.blockHeight / 2.5 + this.blockWidth / 2,
         );
      }
      if (this.dir === 'LEFT') {
         this.ctx.translate(
            Math.round(this.fireX) + this.blockWidth / 2,
            this.fireY - this.blockHeight / 2.5 + this.blockWidth / 2,
         );
      }
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.blockWidth / 2, -this.blockWidth / 2);
      this.ctx.restore();
   }
}
