import { handlerParameters } from '@/lib/handlerParameters';
import { myTank } from './constants/myTank';
import {
   CANVAS_HEIGHT,
   CANVAS_HEIGHT_MOBILE,
   CANVAS_WIDTH,
   CANVAS_WIDTH_MOBILE,
   directions,
   TANK_HEIGHT,
   TANK_HEIGHT_MOBILE,
   TANK_WIDTH,
   TANK_WIDTH_MOBILE,
} from '@/constants/init';
import type { MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';
import { soundsLinks } from '@/constants/sounds';
import type {
   CoordCell,
   Dir,
   KeysEvents,
   NodeCollisions,
   NodeName,
   NodeTypes,
} from '@/types/main';
import { checkCollisions } from '@/lib/checkCollisions';
import { getCoordCell } from '@/lib/getCoordCell';
import { Tank } from '@/types/tank';

export class MyTank {
   ctx: CanvasRenderingContext2D;
   map: MapGame;
   myTank: Tank;
   _$: (id: string) => HTMLElement | null;
   gameTime: number;
   coord: number[];
   X: number;
   Y: number;
   node: NodeName;
   type: NodeTypes;
   cnvWidth: number;
   cnvHeight: number;
   tankWidth: number;
   tankHeight: number;
   _angle: number;
   _coordCell: CoordCell;
   dir: Dir;
   keys: KeysEvents;
   _keyRotate: boolean;
   _delayRotate: number;
   _moveSize: number;
   _soundTankEngine: HTMLAudioElement;
   isMobile: boolean;
   countHit: number;
   checkCollisions: (
      dir: string,
      x: number,
      y: number,
      type: NodeName,
      isMobile: boolean,
   ) => NodeCollisions;

   constructor(ctx: CanvasRenderingContext2D, isMobile: boolean) {
      this.ctx = ctx;
      this._$ = (id: string) => document.getElementById(id)!;
      this.node = 'tank';
      this.type = 'light';
      this.cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
      this.tankWidth = isMobile ? TANK_WIDTH_MOBILE : TANK_WIDTH;
      this.cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
      this.tankHeight = isMobile ? TANK_HEIGHT_MOBILE : TANK_HEIGHT;
      this.myTank = myTank;
      this.countHit = 0;
      this.dir = myTank.dir;
      this.keys = handlerParameters();
      this.gameTime = 0;
      this.coord = isMobile
         ? [myTank.coordMob[0], myTank.coordMob[0]]
         : [myTank.coord[0], myTank.coord[1]];
      this.X = isMobile ? myTank.coordMob[0] : myTank.coord[0]; // смещаю из угла в центр
      this.Y = isMobile ? myTank.coordMob[1] : myTank.coord[1];
      this._angle = 0;
      this.map = map_1;
      this._coordCell = {
         numCellX: 0,
         numCellY: 0,
         cellsX: { start: 0, end: 0 },
         cellsY: { start: 0, end: 0 },
         cellYKey: 0,
      };
      this._keyRotate = false;
      this._delayRotate = 150;
      this._soundTankEngine = new Audio(soundsLinks.engine);
      this.checkCollisions = checkCollisions;
      this.isMobile = isMobile;
      this._moveSize = isMobile ? 0.15 : 0.3;
   }

   update() {
      // получить координаты клетки на каждой итерации
      this._coordCell = getCoordCell(this.X, this.Y, this.isMobile);
      this._moveAndRotateTank();
      myTank.coord[0] = this.X;
      myTank.coord[1] = this.Y;
   }

   _setParameters() {
      const info = this._$('info_text');
      if (info) info.textContent = `Lives: ${this.myTank.lives}`;
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
            !this.checkCollisions(
               key,
               this.X,
               this.Y,
               'myTank',
               this.isMobile,
            )) ||
         this._smoothStop(key)
      )
         return true;

      return false;
   }

   _moveAndRotateTank() {
      this._setParameters();
      // проверка движения
      if (this._checkMoveTank('UP') && !this._keyRotate)
         this.Y -= this._moveSize;

      if (this._checkMoveTank('DOWN') && !this._keyRotate)
         this.Y += this._moveSize;

      if (this._checkMoveTank('RIGHT') && !this._keyRotate)
         this.X += this._moveSize;

      if (this._checkMoveTank('LEFT') && !this._keyRotate)
         this.X -= this._moveSize;
   }

   _smoothStop(key: Dir) {
      if (key === 'UP') {
         if (
            Math.floor(this.Y) > this._coordCell.cellsY.start &&
            this.dir === 'UP'
         )
            return true;
      }

      if (key === 'DOWN') {
         if (
            Math.floor(this.Y) > this._coordCell.cellsY.start + 3 &&
            Math.floor(this.Y) < this._coordCell.cellsY.end &&
            this.dir === 'DOWN'
         )
            return true;
      }

      if (key === 'RIGHT') {
         if (
            Math.floor(this.X) > this._coordCell.cellsX.start &&
            Math.floor(this.X) < this._coordCell.cellsX.end &&
            this.dir === 'RIGHT'
         )
            return true;
      }

      if (key === 'LEFT') {
         if (
            Math.floor(this.X) > this._coordCell.cellsX.start &&
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
         Math.round(this.X) + this.tankWidth / 2,
         this.Y + this.tankWidth / 2,
      );
      this.ctx.rotate((this._angle * Math.PI) / 180);
      this.ctx.drawImage(img, -this.tankWidth / 2, -this.tankWidth / 2);
      this.ctx.restore();
   }
}
