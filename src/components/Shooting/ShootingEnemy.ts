import type { Dir, NodesMove } from '@/types/main';

import { Shooting } from './Shooting';

export class ShootingEnemy extends Shooting {
   dir: Dir;
   fireX: number;
   fireY: number;

   delayFire: number;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      nodesMove: NodesMove,
      X: number,
      Y: number,
   ) {
      super(ctx, isMobile, nodesMove);
      this.delayFire = isMobile ? 1000 : 1500;
      this.dir = 'DOWN';

      this.fireX = X;
      this.fireY = Y;
      // this.checkCollisions = checkCollisions;
      // this.isMobile = isMobile;
      // this.nodesMove = nodesMove;
   }

   update(dir: Dir, X: number, Y: number) {
      this.dir = dir;
      this.fireX = X;
      this.fireY = Y;
      this._deleteShoot();
      this._shootingEnemy();
   }

   _shootingEnemy() {
      // выстрел со звуком
      this._shootingTank();
      this.timer++;
   }

   render() {
      if (this.shooting.length > 0)
         this.shooting.forEach((shoot) => shoot.render());
   }
}
