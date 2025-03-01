import type { Dir, KeysEvents } from '@/types/main';
import { Shoot } from './Shoot';
import { myTank } from '../MyTank/constants/myTank';
import { soundsLinks } from '@/constants/sounds';
import { handlerParameters } from '@/lib/handlerParameters';
import {
   BLOCK_HEIGHT,
   BLOCK_HEIGHT_MOBILE,
   BLOCK_WIDTH,
   BLOCK_WIDTH_MOBILE,
   CANVAS_HEIGHT,
   CANVAS_HEIGHT_MOBILE,
   CANVAS_WIDTH,
   CANVAS_WIDTH_MOBILE,
} from '@/constants/init';
import type { Block, MapGame } from '@/types/map';
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
   checkCollisions: (key: string, x: number, y: number) => Block | boolean;
   delayFire: number;
   isMobile: boolean;

   constructor(ctx: CanvasRenderingContext2D, isMobile: boolean) {
      this.ctx = ctx;
      this.cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
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
         checkCollisions(this.dir, this.fireX, this.fireY, 'fire', isMobile);
      this.isMobile = isMobile;
   }

   update() {
      // console.log('his.shooting:', this.shooting);

      this._deleteFires();
      this._createFires();
   }

   _createFires() {
      // выстрел со звуком
      if (this.keys.isDown('SPACE').status) {
         if (this.timer > this.delayFire) {
            this._soundTankFire.play();

            this.dir = myTank.dir;

            // создает новый выстрел
            const newShoot = new Shoot(
               this.ctx,
               myTank.coord[0],
               myTank.coord[1],
               this.dir,
               this.keys.isDown(this.dir).angle,
               this.isMobile,
            );

            this.shooting.push(newShoot);
            // Смещает координаты центра выстрела

            this.timer = 0;
         } else {
            // задержка отключения звука
            if (this.timer > this.delayFire / 1.6) {
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
            const nodeCollision = this.checkCollisions(
               this.dir,
               this.fireX,
               this.fireY,
            );

            if (nodeCollision) {
               this._hitNode(nodeCollision);
               return false;
            }
            return true;
         });
      }
   }

   _hitNode(node: Block | boolean) {
      if (typeof node !== 'boolean' && node.part === 'map') {
         const arr = this.map[node.coord[1]].map((nd) => {
            if (node.type === 'bricks' && nd.coord[0] === node.coord[0])
               nd.countHit++;
            return nd;
         });

         this.map = { ...this.map, [node.coord[1]]: arr };

         localStorage.setItem('map_1', JSON.stringify(this.map));
      }
   }

   render() {
      if (this.shooting.length > 0)
         this.shooting.forEach((shoot) => shoot.render());
   }
}
