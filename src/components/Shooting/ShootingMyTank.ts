import type { Dir, KeysEvents, NodesMove } from '@/types/main';
import { myTank } from '../MyTank/constants/myTank';
import { handlerParameters } from '@/lib/handlerParameters';

import { Shooting } from './Shooting';
import { soundsLinks } from '@/constants/sounds';

export class ShootingMyTank extends Shooting {
   keys: KeysEvents;
   dir: Dir;
   fireX: number;
   fireY: number;

   delayFire: number;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      nodesMove: NodesMove,
   ) {
      super(ctx, isMobile, nodesMove);
      this.keys = handlerParameters();
      this.delayFire = isMobile ? 300 : 400;
      this.dir = myTank.dir;

      this.fireX = myTank.coord[0];
      this.fireY = myTank.coord[1];
      this._soundTankFire = new Audio(soundsLinks.tankFire);
   }

   update(dir: Dir, X: number, Y: number) {
      this.dir = dir;
      this.fireX = X;
      this.fireY = Y;
      this._deleteShoot();
      this._shootingMyTank();
   }

   _shootingMyTank() {
      // выстрел со звуком
      if (this.keys.isDown('SPACE').status) {
         this._shootingTank();
      }
      this.timer++;
   }

   render() {
      if (this.shooting.length > 0)
         this.shooting.forEach((shoot) => shoot.render());
   }
}
