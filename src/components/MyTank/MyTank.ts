import { handlerEvents } from '@/lib/handlerEvents';
import { myTank } from './constants/myTank';
import type { IMyTank } from './types/myTank';
import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import type { MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';

interface Input {
   isDown: (key: string) => boolean;
   isUp: (key: string) => boolean;
}

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class MyTank {
   ctx: CanvasRenderingContext2D;
   map: MapGame;
   myTank: IMyTank;
   gameTime: number;
   tankX: number;
   tankY: number;
   cnvWidth: number;
   cnvHeight: number;
   blockWidth: number;
   blockHeight: number;
   _angle: number;
   _coordCell: { cellX: number; cellY: number };
   dir: Dir;
   input: Input;
   _keyRotate: boolean;
   _delayRotate: number;

   constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.myTank = myTank;
      this.dir = 'UP';
      this.input = handlerEvents();
      this.gameTime = 0;
      this.tankX = myTank.coord[0]; // смещаю из угла в центр
      this.tankY = myTank.coord[1];
      this._angle = 0;
      this.map = map_1;
      this._coordCell = { cellX: 0, cellY: 0 };
      this._keyRotate = false;
      this._delayRotate = 150;
   }

   update(dt: number) {
      // получить координаты клетки на каждой итерации
      this._getCoordCell();
      this._moveAndRotateTank();

      myTank.coord[0] = this.tankX;
      myTank.coord[1] = this.tankY;
   }

   _setTimerRotate() {
      this._keyRotate = true;
      const isTimerRotate = setTimeout(() => {
         this._keyRotate = false;
         clearTimeout(isTimerRotate);
      }, this._delayRotate);
   }

   _moveAndRotateTank() {
      // проверка препятствий и плавная остановка
      if (this._checkObstacles('UP') || this._smoothStop('UP')) {
         // если не совпадают клавиша поворота с направлением
         // устанаить угол поворота, направление, запустить таймер поворота
         if (this.dir !== 'UP') {
            this._getAngleRotate('UP');
            this.dir = 'UP';
            this._setTimerRotate();
         } // пока работает таймер не двигается
         if (!this._keyRotate) {
            this.tankY -= 0.5;
         }
      }

      if (this._checkObstacles('DOWN') || this._smoothStop('DOWN')) {
         if (this.dir !== 'DOWN') {
            this._getAngleRotate('DOWN');
            this.dir = 'DOWN';
            this._setTimerRotate();
         }
         if (!this._keyRotate) this.tankY += 0.5;
      }

      if (this._checkObstacles('RIGHT') || this._smoothStop('RIGHT')) {
         if (this.dir !== 'RIGHT') {
            this._getAngleRotate('RIGHT');
            this.dir = 'RIGHT';
            this._setTimerRotate();
         }
         if (!this._keyRotate) this.tankX += 0.5;
      }

      if (this._checkObstacles('LEFT') || this._smoothStop('LEFT')) {
         if (this.dir !== 'LEFT') {
            this._getAngleRotate('LEFT');
            this.dir = 'LEFT';
            this._setTimerRotate();
         }
         if (!this._keyRotate) this.tankX -= 0.5;
      }
   }

   _getAngleRotate(key: string) {
      if (key === 'UP') this._angle = 0;
      if (key === 'DOWN') this._angle = 180;
      if (key === 'RIGHT') this._angle = 90;
      if (key === 'LEFT') this._angle = -90;
   }

   _getCoordCell() {
      const cellY =
         Math.floor(this.tankY / this.blockHeight) * this.blockHeight;
      const cellX = Math.floor(this.tankX / this.blockWidth) * this.blockWidth;
      this._coordCell = { cellX, cellY };
   }

   _smoothStop(key: Dir) {
      if (key === 'UP') {
         if (
            Math.floor(this.tankY) - 1 > this._coordCell.cellY &&
            this.dir === 'UP'
         )
            return true;
      } else if (key === 'DOWN') {
         if (
            Math.floor(this.tankY) > this._coordCell.cellY + 3 &&
            Math.floor(this.tankY) < this._coordCell.cellY + this.blockHeight &&
            this.dir === 'DOWN'
         )
            return true;
      } else if (key === 'RIGHT') {
         if (
            Math.floor(this.tankX) > this._coordCell.cellX &&
            Math.floor(this.tankX) < this._coordCell.cellX + this.blockWidth &&
            this.dir === 'RIGHT'
         )
            return true;
      } else if (key === 'LEFT') {
         if (
            Math.floor(this.tankX) > this._coordCell.cellX &&
            this.dir === 'LEFT'
         )
            return true;
      } else {
         return false;
      }
   }

   _checkObstacles(key: string) {
      if (key === 'UP') {
         if (this.tankY > 0 && this.input.isDown(key)) return true;
      }
      if (key === 'DOWN') {
         if (
            this.tankY < this.cnvHeight - this.blockHeight - 1 &&
            this.input.isDown(key)
         )
            return true;
      }
      if (key === 'RIGHT') {
         if (
            this.tankX < this.cnvWidth - this.blockWidth - 1 &&
            this.input.isDown(key)
         )
            return true;
      }
      if (key === 'LEFT') {
         if (this.tankX > 0 && this.input.isDown(key)) return true;
      }
      return false;
   }

   renderMyTank() {
      const img = window.resources.get(this.myTank.img);
      // реализация поворота в движении
      this.ctx.save();
      // смещаю координаты из угла в центр, поворот и возврат в угол
      this.ctx.translate(
         Math.round(this.tankX) + this.blockWidth / 2,
         this.tankY + this.blockWidth / 2,
      );
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.blockWidth / 2, -this.blockWidth / 2);
      this.ctx.restore();
   }
}
