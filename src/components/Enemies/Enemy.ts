import { Dir, Directions, TypeVerifiable } from '@/types/main';
import { IEnemyTank } from './types/enemy';
import { enimyLightTank } from './constants/enemies';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   directions,
} from '@/constants/init';
import { Block } from '@/types/map';
import { checkCollisions } from '@/lib/checkCollisions';
import { getCoordCell } from '@/lib/getCoordCell';

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
   checkCollisions: (
      dir: string,
      x: number,
      y: number,
      type: TypeVerifiable,
      isMobile: boolean,
   ) => Block | boolean;
   _timer: number;
   _timerDelay: number;
   _coordCell: { cellX: number; cellY: number };
   _directions: Directions;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      dir: Dir,
      coord: number[],
   ) {
      this.ctx = ctx;
      this.isMobile = isMobile;
      this._dir = dir;
      this._speedEnemy = isMobile ? 0.2 : 0.1;
      this._enemyX = coord[0];
      this._enemyY = coord[1];
      this.enemyL = enimyLightTank;
      this._angle = 0;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.checkCollisions = checkCollisions;
      this._timer = 0;
      this._timerDelay = 500;
      this._coordCell = { cellX: 0, cellY: 0 };
      this._directions = directions;
   }
   update() {
      this._coordCell = getCoordCell(this._enemyX, this._enemyY, this.isMobile);
      if (!this._checkObstacles()) {
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
      }

      return { enemyX: this._enemyX, enemyY: this._enemyY };
   }

   _changeDir(dir?: Dir) {
      if (dir === 'RIGHT') {
         this._angle = 90;
         this._dir = 'RIGHT';
      } else if (dir === 'LEFT') {
         this._angle = -90;
         this._dir = 'LEFT';
      } else if (dir === 'DOWN') {
         this._angle = 180;
         this._dir = 'DOWN';
      } else if (dir === 'UP') {
         this._angle = 0;
         this._dir = 'UP';
      }
   }

   _getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   _checkObstacles() {
      // проверка столкновений
      // первое столкновение
      const nodeCollision = this.checkCollisions(
         this._dir,
         this._enemyX,
         this._enemyY,
         'enemy',
         this.isMobile,
      );

      // задержка поворота и проверка свободного направления
      if (this._timer > this._timerDelay) {
         // первая проверка вниз
         const checkDown = this.checkCollisions(
            'DOWN',
            this._enemyX,
            this._enemyY,
            'enemy',
            this.isMobile,
         );
         // если свободно идет вниз иначе выбирает случайное свободное направление
         if (!checkDown) {
            this._changeDir('DOWN');
         } else {
            let checkDir: Block | boolean = true;

            while (checkDir) {
               // console.log('checkDir:', checkDir);
               const randomInt = this._getRandomInt(
                  1,
                  this._directions.length - 1,
               );

               checkDir = this.checkCollisions(
                  this._directions[randomInt],
                  this._enemyX,
                  this._enemyY,
                  'enemy',
                  this.isMobile,
               );

               if (!checkDir) {
                  this._changeDir(this._directions[randomInt]);
                  break;
               }
            }
         }

         this._timer = 0;
      }

      if (nodeCollision) {
         this._timer++;

         // this._hitNode(nodeCollision);
         return true;
      }
      return false;
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
