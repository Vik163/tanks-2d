import type { Dir, NodesMove } from '@/types/main';
import type { IEnemyTank } from './types/enemy';
import { enimyLightTank } from './constants/enemies';
import {
   TANK_HEIGHT,
   TANK_HEIGHT_MOBILE,
   TANK_WIDTH,
   TANK_WIDTH_MOBILE,
} from '@/constants/init';

import { RandomMove } from './RandomMove';
import { checkIntersect } from '@/lib/checkIntersect';

export class Enemy {
   ctx: CanvasRenderingContext2D;
   isMobile: boolean;
   enemyL: IEnemyTank;
   _dir: Dir;
   _speedEnemy: number;
   X: number;
   Y: number;
   tankWidth: number;
   tankHeight: number;
   _angle: number; //! рабочие углы поворота (-90, 0, 90, 180)
   _randomMove: RandomMove;
   node: 'enemy';
   countHit: number;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      dir: Dir,
      coord: number[],
   ) {
      this.ctx = ctx;
      this.node = 'enemy';
      this.isMobile = isMobile;
      this._dir = dir;
      this._speedEnemy = isMobile ? 0.2 : 0.1;
      this.X = coord[0] + 1;
      this.Y = coord[1];
      this.enemyL = enimyLightTank;
      this._angle = 0;
      this.tankWidth = isMobile ? TANK_WIDTH_MOBILE : TANK_WIDTH;
      this.tankHeight = isMobile ? TANK_HEIGHT_MOBILE : TANK_HEIGHT;
      this._randomMove = new RandomMove(isMobile, dir, coord);
      this.countHit = 0;
   }
   update(enemies: NodesMove) {
      // const nodeIntersect = this._checkIntersect(enemies);

      const { dir, angle, obstacles } = this._randomMove.update(
         this.X,
         this.Y,
         enemies,
      );
      this._dir = dir;
      this._angle = angle;
      if (!obstacles) {
         if (this._dir === 'UP') {
            this.Y -= this._speedEnemy;
         }
         if (this._dir === 'DOWN') {
            this.Y += this._speedEnemy;
         }
         if (this._dir === 'RIGHT') {
            this.X += this._speedEnemy;
         }
         if (this._dir === 'LEFT') {
            this.X -= this._speedEnemy;
         }
      }

      return { enemyX: this.X, enemyY: this.Y };
   }

   _checkIntersect(enemies: NodesMove) {
      const coord = { x: this.X, y: this.Y };
      const nodeId = checkIntersect(coord, undefined, enemies);
      // console.log('nodeId:', nodeId);
      return nodeId;
   }

   render() {
      const link = this.isMobile ? this.enemyL.imgMob : this.enemyL.img;
      const img = window.resources.get(link);
      // реализация поворота в движении
      this.ctx.save();
      // смещаю координаты из угла в центр, поворот и возврат в угол
      this.ctx.translate(
         Math.round(this.X) + this.tankWidth / 2,
         this.Y + this.tankWidth / 2,
      );
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.tankWidth / 2, -this.tankWidth / 2);
      this.ctx.restore();
   }
}
