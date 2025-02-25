import type { Dir, KeysEvents } from '@/types/main';
import { Shoot } from './Shoot';
import { myTank } from '../MyTank/constants/myTank';
import { soundsLinks } from '@/constants/sounds';
import { handlerParameters } from '@/lib/handlerParameters';
import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import type { MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';
import { checkCollisions } from '@/lib/checkCollisions';

export class Shooting {
   shooting: Shoot[];
   timer: number;
   keys: KeysEvents;
   _soundTankFire: HTMLAudioElement;
   ctx: CanvasRenderingContext2D;
   dir: Dir;
   _coordCell: { cellX: number; cellY: number };
   cnvWidth: number;
   cnvHeight: number;
   blockWidth: number;
   blockHeight: number;
   map: MapGame;
   fireX: number;
   fireY: number;
   checkCollisions: (key: string, x: number, y: number) => boolean | undefined;
   delayFire: number;

   constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.shooting = [];
      this.keys = handlerParameters();
      this.timer = 0;
      this.delayFire = 400;
      this._soundTankFire = new Audio(soundsLinks.tankFire);
      this.dir = myTank.dir;
      this._coordCell = { cellX: 0, cellY: 0 };
      this.map = map_1;
      this.fireX = myTank.coord[0];
      this.fireY = myTank.coord[1];
      this.checkCollisions = () =>
         checkCollisions(this.dir, this.fireX, this.fireY, 'fire');
   }

   update() {
      // console.log('myTank.dir:', myTank.dir);

      this._deleteFires();
      this._createFires();
      console.log('this.shooting:', this.shooting);
   }

   _createFires() {
      // выстрел со звуком
      if (this.keys.isDown('SPACE').status) {
         if (this.timer > this.delayFire) {
            this._soundTankFire.play();

            this.dir = myTank.dir;

            // создает новый выстрел
            // console.log('myTank.coord[1]:', myTank.coord[1]);
            const newShoot = new Shoot(
               this.ctx,
               myTank.coord[0],
               myTank.coord[1],
               this.dir,
               this.keys.isDown(this.dir).angle,
            );

            this.shooting.push(newShoot);
            // Смещает координаты центра выстрела

            this.timer = 0;
         } else {
            // задержка отключения звука
            if (this.timer > this.delayFire / 2) {
               this._soundTankFire.pause();
               this._soundTankFire.currentTime = 0;
            }
         }
      }
      this.timer++;
   }

   _deleteFires() {
      if (this.shooting.length > 0) {
         this.shooting = this.shooting.filter((shoot) => {
            // получить новые координаты выстрела
            const { fireX, fireY } = shoot.update();

            this.fireX = fireX;
            this.fireY = fireY;
            // проверка столкновений
            const isCollision = this.checkCollisions(
               this.dir,
               this.fireX,
               this.fireY,
            );

            if (isCollision) {
               return false;
            }
            return true;
         });
      }
   }

   render() {
      if (this.shooting.length > 0)
         this.shooting.forEach((shoot) => shoot.render());
   }
}
