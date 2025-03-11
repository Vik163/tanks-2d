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
   _timerMove: number;
   _timerDelay: number;
   _timerMoveDelay: number;
   _coordCell: {
      numCellY: number;
      numCellX: number;
      cellX: number;
      cellY: number;
   };
   _countMoveDown: number;
   _directions: Directions;
   _randomCellCoord: number;

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
      this._timerMove = 0;
      this._timerMoveDelay = 5000;
      this._timerDelay = 1000;
      this._coordCell = { numCellX: 0, numCellY: 0, cellX: 0, cellY: 0 };
      this._directions = directions;
      this._randomCellCoord = 0;
      this._countMoveDown = 0;
   }
   update() {
      this._coordCell = getCoordCell(this._enemyX, this._enemyY, this.isMobile);
      if (!this._checkObstacles()) {
         // console.log('this._timer:', this._timer);

         // console.log('his._dir:', this._dir);
         if (this._dir === 'UP') {
            this._enemyY -= this._speedEnemy;
         }
         if (this._dir === 'DOWN') {
            this._enemyY += this._speedEnemy;
         }
         if (this._dir === 'RIGHT') {
            this._enemyX += this._speedEnemy;
         }
         if (
            this._dir === 'LEFT'
            // &&
            // this._randomCellCoord + this.blockWidth < this._enemyX
         ) {
            this._enemyX -= this._speedEnemy;
         }
      }

      return { enemyX: this._enemyX, enemyY: this._enemyY };
   }

   _changeDir(dir: Dir) {
      this._dir = dir;

      if (dir === 'RIGHT') {
         this._countMoveDown = 0;
         this._angle = 90;
      } else if (dir === 'LEFT') {
         this._countMoveDown = 0;
         this._angle = -90;
      } else if (dir === 'DOWN') {
         this._countMoveDown++;
         this._angle = 180;
      } else if (dir === 'UP') {
         this._angle = 0;
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
         Math.ceil(this._enemyX),
         this._enemyY,
         'enemy',
         this.isMobile,
      );
      this._timer++;

      if (this._timer < this._timerDelay) {
         return true;
      }

      if (nodeCollision) {
         this._checkDir();
         this._timer = 0;

         // this._hitNode(nodeCollision);
      }
      if (
         this._dir === 'LEFT' &&
         this._randomCellCoord + this.blockWidth >= this._enemyX
      ) {
         this._timer = 0;
         this._checkDir();

         // this._hitNode(nodeCollision);
      }
      return false;
   }

   _checkDir() {
      // задержка поворота и проверка свободного направления
      // первая проверка вниз
      const checkDown = this.checkCollisions(
         'DOWN',
         this._enemyX,
         this._enemyY,
         'enemy',
         this.isMobile,
      );
      // если свободно идет вниз иначе выбирает случайное свободное направление
      if (!checkDown && this._countMoveDown < 2) {
         this._changeDir('DOWN');
      } else {
         let checkDir: Block | boolean = true;
         const maxIntRandom =
            this._coordCell.numCellX - 3 > 0 ? this._coordCell.numCellX - 3 : 0;

         this._randomCellCoord =
            this._getRandomInt(14, maxIntRandom) * this.blockWidth;

         while (checkDir) {
            const randomDir = this._getRandomInt(
               1,
               this._directions.length - 1,
            );
            const newDir = this._directions[randomDir];

            checkDir = !this.checkCollisions(
               newDir,
               this._enemyX,
               this._enemyY,
               'enemy',
               this.isMobile,
            );

            if (checkDir) {
               this._changeDir(newDir);
               break;
            }
         }
      }
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
