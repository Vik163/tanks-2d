import type { Dir, NodeCollisions, NodeName, NodesMove } from '@/types/main';
import { Shoot } from './Shoot';
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
import type { MapGame } from '@/types/map';
import { map_1 } from '@/constants/maps';
import { checkCollisions } from '@/lib/checkCollisions';

export class Shooting {
   shooting: Shoot[];
   timer: number;
   _soundTankFire: HTMLAudioElement | undefined;
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
   checkCollisions: (
      dir: string,
      x: number,
      y: number,
      type: NodeName,
      isMobile: boolean,
   ) => NodeCollisions;
   delayFire: number;
   isMobile: boolean;
   nodesMove: NodesMove;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      nodesMove: NodesMove,
   ) {
      this.ctx = ctx;
      this.cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.shooting = [];
      this.timer = 0;
      this.delayFire = 0;
      this._soundTankFire = undefined;
      this.dir = 'UP';
      this._coordCell = { cellX: 0, cellY: 0 };
      this.map = map_1;
      this.fireX = 0;
      this.fireY = 0;
      this.checkCollisions = checkCollisions;
      this.isMobile = isMobile;
      this.nodesMove = nodesMove;
   }

   _shootingTank() {
      // выстрел со звуком
      if (this.timer > this.delayFire) {
         if (this._soundTankFire) this._soundTankFire.play();

         // создает новый выстрел
         const newShoot = new Shoot(
            this.ctx,
            this.fireX,
            this.fireY,
            this.dir,
            this.isMobile,
            'my',
         );

         this.shooting.push(newShoot);
         // Смещает координаты центра выстрела

         this.timer = 0;
      } else if (this._soundTankFire) {
         // задержка отключения звука
         if (this.timer > this.delayFire / 1.6) {
            this._soundTankFire.pause();
            this._soundTankFire.currentTime = 0;
         }
      }
   }

   _deleteShoot() {
      if (this.shooting.length > 0) {
         this.shooting = this.shooting.filter((shoot) => {
            // получить новые координаты выстрела
            const { X, Y } = shoot.update();

            this.fireX = X;
            this.fireY = Y;
            // проверка столкновений
            const nodeCollision = this.checkCollisions(
               this.dir,
               this.fireX,
               this.fireY,
               'fire',
               this.isMobile,
            );

            if (nodeCollision) {
               this._hitNode(nodeCollision);
               return false;
            }
            return true;
         });
      }
   }

   _hitNode(node: NodeCollisions) {
      if (typeof node !== 'boolean' && node.node === 'map') {
         const arr = this.map.map((nd) => {
            if (
               node.type === 'bricks' &&
               nd.coord[0] === node.coord[0] &&
               nd.coord[1] === node.coord[1]
            )
               nd.countHit++;
            return nd;
         });
         this.map = arr;
         localStorage.setItem('map_1', JSON.stringify(this.map));
      }
   }
}
