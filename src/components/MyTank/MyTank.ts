import { handlerParameters } from '@/lib/handlerParameters';
import { myTank } from './constants/myTank';
import type { IMyTank } from './types/myTank';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   CANVAS_HEIGHT,
   CANVAS_HEIGHT_MOBILE,
   CANVAS_WIDTH,
   CANVAS_WIDTH_MOBILE,
   directions,
} from '@/constants/init';
import type { Block, MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';
import { soundsLinks } from '@/constants/sounds';
import type { Dir, KeysEvents } from '@/types/main';
import { checkCollisions } from '@/lib/checkCollisions';
import { getCoordCell } from '@/lib/getCoordCell';

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
   keys: KeysEvents;
   _keyRotate: boolean;
   _delayRotate: number;
   _moveSize: number;
   _soundTankEngine: HTMLAudioElement;
   isMobile: boolean;
   checkCollisions: (
      key: string,
      x: number,
      y: number,
      type: string,
   ) => Block | boolean;

   constructor(ctx: CanvasRenderingContext2D, isMobile: boolean) {
      this.ctx = ctx;
      this.cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.myTank = myTank;
      this.dir = myTank.dir;
      this.keys = handlerParameters();
      this.gameTime = 0;
      this.tankX = isMobile ? myTank.coordMob[0] : myTank.coord[0]; // смещаю из угла в центр
      this.tankY = isMobile ? myTank.coordMob[1] : myTank.coord[1];
      this._angle = 0;
      this.map = map_1;
      this._coordCell = { cellX: 0, cellY: 0 };
      this._keyRotate = false;
      this._delayRotate = 150;
      this._soundTankEngine = new Audio(soundsLinks.engine);
      this.checkCollisions = () =>
         checkCollisions(this.dir, this.tankX, this.tankY, 'tank', isMobile);
      this.isMobile = isMobile;
      this._moveSize = isMobile ? 0.2 : 0.5;
   }

   update() {
      // получить координаты клетки на каждой итерации
      this._coordCell = getCoordCell(this.tankX, this.tankY, this.isMobile);
      this._moveAndRotateTank();
      myTank.coord[0] = this.tankX;
      myTank.coord[1] = this.tankY;
   }

   _setParameters() {
      if (
         this.keys.isDown('UP').status ||
         this.keys.isDown('DOWN').status ||
         this.keys.isDown('LEFT').status ||
         this.keys.isDown('RIGHT').status
      ) {
         directions.forEach((dir) => {
            if (this.keys.isDown(dir).status) {
               this._angle = this.keys.isDown(dir).angle;

               // если не совпадают клавиша поворота с направлением
               // устанаить угол поворота, направление, запустить таймер поворота
               if (this.dir !== this.keys.isDown(dir).dir) {
                  myTank.dir = this.dir = this.keys.isDown(dir).dir;
                  this._setTimerRotate();
               }
            }
         });

         this._soundTankEngine.play();
      } else {
         this._soundTankEngine.pause();
         this._soundTankEngine.currentTime = 0;
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
      if (
         (this.keys.isDown(key).status &&
            !this.checkCollisions(key, this.tankX, this.tankY, 'tank')) ||
         this._smoothStop(key)
      )
         return true;

      return false;
   }

   _moveAndRotateTank() {
      this._setParameters();
      // проверка движения
      if (this._checkMoveTank('UP') && !this._keyRotate)
         this.tankY -= this._moveSize;

      if (this._checkMoveTank('DOWN') && !this._keyRotate)
         this.tankY += this._moveSize;

      if (this._checkMoveTank('RIGHT') && !this._keyRotate)
         this.tankX += this._moveSize;

      if (this._checkMoveTank('LEFT') && !this._keyRotate)
         this.tankX -= this._moveSize;
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
         ) {
            return true;
         }
      }
      return false;
   }

   renderMyTank() {
      const link = this.isMobile ? this.myTank.imgMob : this.myTank.img;
      const img = window.resources.get(link);
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
