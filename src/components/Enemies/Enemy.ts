import { Dir } from '@/types/main';
import { IEnemyTank } from './types/enemy';
import { enimyLightTank } from './constants/enemies';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
} from '@/constants/init';

export class Enemy {
   ctx: CanvasRenderingContext2D;
   isMobile: boolean;
   enemyL: IEnemyTank;
   _dir: Dir;
   _speedEnemy: number;
   _enemyX: number;
   _enemyY: number;
   blockWidth: number;
   blockHeight: number;
   _angle: number;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      coord: number[],
   ) {
      this.ctx = ctx;
      this.isMobile = isMobile;
      this._dir = 'DOWN';
      this._speedEnemy = isMobile ? 0.2 : 0.4;
      this._enemyX = coord[0];
      this._enemyY = coord[1];
      this.enemyL = enimyLightTank;
      this._angle = 0;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
   }
   update() {
      if (this._dir === 'UP') {
         this._enemyY -= this._speedEnemy;
      }
      if (this._dir === 'DOWN') {
         this._enemyY += this._speedEnemy;
      }
      if (this._dir === 'RIGHT') {
         this._enemyX += this._speedEnemy;
      }
      if (this._dir === 'LEFT') {
         this._enemyX -= this._speedEnemy;
      }

      return { enemyX: this._enemyX, enemyY: this._enemyY };
   }
   render() {
      const link = this.isMobile ? this.enemyL.imgMob : this.enemyL.img;
      const img = window.resources.get(link);
      // реализация поворота в движении
      this.ctx.save();
      // смещаю координаты из угла в центр, поворот и возврат в угол
      this.ctx.translate(
         Math.round(this._enemyX) + this.blockWidth / 2,
         this._enemyY + this.blockWidth / 2,
      );
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.blockWidth / 2, -this.blockWidth / 2);
      this.ctx.restore();
   }
}
