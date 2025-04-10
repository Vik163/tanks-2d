import { handlerParameters } from '@/lib/handlerParameters';
import { shootTank } from './constants/shoot';
import type { Dir, KeysEvents, NodeName } from '@/types/main';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
} from '@/constants/init';
import type { ShootTank } from '@/types/shoot';

export class Shoot {
   ctx: CanvasRenderingContext2D;
   shoot: ShootTank;
   node: NodeName;
   keys: KeysEvents;
   X: number;
   Y: number;
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
      isMobile: boolean,
      whose: 'enemy' | 'my',
   ) {
      this.ctx = ctx;
      this.node = 'fire';
      this.shoot = shootTank;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.keys = handlerParameters();
      this.X = tankX;
      this.Y = tankY;
      this.dir = dir;
      this._angle = 0;
      this.speedFire = isMobile ? 0.5 : 0.6;
      this._timerLink = 0;
      this.isMobile = isMobile;
   }

   update() {
      if (this.dir === 'UP') {
         this._angle = 0;
         this.Y -= this.speedFire;
      }
      if (this.dir === 'DOWN') {
         this._angle = 180;
         this.Y += this.speedFire;
      }
      if (this.dir === 'RIGHT') {
         this._angle = 90;
         this.X += this.speedFire;
      }
      if (this.dir === 'LEFT') {
         this._angle = -90;
         this.X -= this.speedFire;
      }

      return { X: this.X, Y: this.Y };
   }

   render() {
      // изменяющийся огонь
      let link = this.shoot.fireLink[2];

      if (!this.isMobile) {
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
      }
      const img = window.resources.get(link);

      this.ctx.save();
      // смещаю координаты из угла в центр, поворот и возврат в угол

      if (this.dir === 'UP') {
         this.ctx.translate(
            Math.round(this.X + this.blockWidth / 2.5) + this.blockWidth / 2,
            this.Y + this.blockHeight / 2 + 5,
         );
      }
      if (this.dir === 'DOWN') {
         this.ctx.translate(
            Math.round(this.X - this.blockWidth / 2.5) + this.blockWidth / 2,
            this.Y + this.blockWidth / 2 - 5,
         );
      }
      if (this.dir === 'RIGHT') {
         this.ctx.translate(
            Math.round(this.X) + this.blockWidth / 2 - 5,
            this.Y + this.blockHeight / 2.5 + this.blockHeight / 2,
         );
      }
      if (this.dir === 'LEFT') {
         this.ctx.translate(
            Math.round(this.X) + this.blockWidth / 2,
            this.Y - this.blockHeight / 2.5 + this.blockWidth / 2,
         );
      }
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.blockWidth / 2, -this.blockHeight / 2);
      this.ctx.restore();
   }
}
