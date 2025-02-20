import { handlerEventsAndAngle } from '@/lib/handlerEvents';
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
import { soundsLinks } from '@/constants/sounds';

interface Input {
   isDown: (key: string) => { angle: number; status: boolean };
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
   _soundTankEngine: HTMLAudioElement;

   constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.myTank = myTank;
      this.dir = 'UP';
      this.input = handlerEventsAndAngle();
      this.gameTime = 0;
      this.tankX = myTank.coord[0]; // смещаю из угла в центр
      this.tankY = myTank.coord[1];
      this._angle = 0;
      this.map = map_1;
      this._coordCell = { cellX: 0, cellY: 0 };
      this._keyRotate = false;
      this._delayRotate = 150;
      this._soundTankEngine = new Audio(soundsLinks.engine);
   }

   update(dt: number) {
      // получить координаты клетки на каждой итерации
      this._getCoordCell();
      this._moveAndRotateTank();

      myTank.coord[0] = this.tankX;
      myTank.coord[1] = this.tankY;
   }

   _setDounds() {
      if (
         this.input.isDown('UP').status ||
         this.input.isDown('DOWN').status ||
         this.input.isDown('LEFT').status ||
         this.input.isDown('RIGHT').status
      ) {
         this._soundTankEngine.play();
      } else {
         this._soundTankEngine.pause();
      }
   }

   _setTimerRotate() {
      this._keyRotate = true;
      const isTimerRotate = setTimeout(() => {
         this._keyRotate = false;
         clearTimeout(isTimerRotate);
      }, this._delayRotate);
   }

   // проверка препятствий и плавная остановка
   _checkMoveTank(key: Dir) {
      this._angle = this.input.isDown(key).angle;
      if (
         (this._checkObstacles(key) && this.input.isDown(key).status) ||
         this._smoothStop(key)
      )
         return true;

      return false;
   }

   _moveAndRotateTank() {
      this._setDounds();
      // проверка движения
      if (this._checkMoveTank('UP')) {
         // если не совпадают клавиша поворота с направлением
         // устанаить угол поворота, направление, запустить таймер поворота
         if (this.dir !== 'UP') {
            this.dir = 'UP';
            this._setTimerRotate();
         } // пока работает таймер не двигается
         if (!this._keyRotate) {
            this.tankY -= 0.5;
         }
      }

      if (this._checkMoveTank('DOWN')) {
         if (this.dir !== 'DOWN') {
            this.dir = 'DOWN';
            this._setTimerRotate();
         }
         if (!this._keyRotate) {
            this._setDounds();
            this.tankY += 0.5;
         }
      }

      if (this._checkMoveTank('RIGHT')) {
         if (this.dir !== 'RIGHT') {
            this.dir = 'RIGHT';
            this._setTimerRotate();
         }
         if (!this._keyRotate) this.tankX += 0.5;
      }

      if (this._checkMoveTank('LEFT')) {
         if (this.dir !== 'LEFT') {
            this.dir = 'LEFT';
            this._setTimerRotate();
         }
         if (!this._keyRotate) this.tankX -= 0.5;
      }
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
      }

      if (key === 'DOWN') {
         if (
            Math.floor(this.tankY) > this._coordCell.cellY + 3 &&
            Math.floor(this.tankY) < this._coordCell.cellY + this.blockHeight &&
            this.dir === 'DOWN'
         )
            return true;
      }

      if (key === 'RIGHT') {
         if (
            Math.floor(this.tankX) > this._coordCell.cellX &&
            Math.floor(this.tankX) < this._coordCell.cellX + this.blockWidth &&
            this.dir === 'RIGHT'
         )
            return true;
      }

      if (key === 'LEFT') {
         if (
            Math.floor(this.tankX) > this._coordCell.cellX &&
            this.dir === 'LEFT'
         )
            return true;
      }
      return false;
   }

   _checkObstaclesMap(key: string) {
      if (key === 'UP') {
         if (
            this.tankY > 0 &&
            this.map[this._coordCell.cellY - this.blockHeight] &&
            !this.map[this._coordCell.cellY - this.blockHeight].some(
               (bl) =>
                  bl.coord[0] === this._coordCell.cellX &&
                  bl.type !== 'placeStart',
            )
         ) {
            return true;
         }
      }
      if (key === 'DOWN') {
         if (
            this.tankY < this.cnvHeight - this.blockHeight &&
            this.map[this._coordCell.cellY + this.blockHeight] &&
            !this.map[this._coordCell.cellY + this.blockHeight].some(
               (bl) =>
                  bl.coord[0] === this._coordCell.cellX &&
                  bl.type !== 'placeStart',
            )
         )
            return true;
      }
      if (
         key === 'RIGHT' &&
         !this.map[this._coordCell.cellY].some(
            (bl) =>
               bl.coord[0] === this._coordCell.cellX + this.blockWidth &&
               bl.type !== 'placeStart',
         )
      ) {
         if (this.tankX < this.cnvWidth - this.blockWidth) return true;
      }
      if (key === 'LEFT') {
         if (
            this.tankX > 0 &&
            !this.map[this._coordCell.cellY].some(
               (bl) =>
                  bl.coord[0] === this._coordCell.cellX - this.blockWidth &&
                  bl.type !== 'placeStart',
            )
         )
            return true;
      }
      return false;
   }

   _checkObstacles(key: string) {
      if (key === 'UP') {
         if (this._checkObstaclesMap('UP')) return true;
      }
      if (key === 'DOWN') {
         if (this._checkObstaclesMap('DOWN')) return true;
      }
      if (key === 'RIGHT') {
         if (this._checkObstaclesMap('RIGHT')) return true;
      }
      if (key === 'LEFT') {
         if (this._checkObstaclesMap('LEFT')) return true;
      }
      return false;
   }

   renderMyTank() {
      const img = window.resources.getImg(this.myTank.img);
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
