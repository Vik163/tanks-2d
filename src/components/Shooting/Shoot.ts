import { handlerEventsAndAngle } from '@/lib/handlerEvents';
import { shootTank } from './constants/shoot';
import { ShootTank } from './types/shoot';
import { KeysEvents } from '@/types/handlerEvents';

export class Shoot {
   ctx: CanvasRenderingContext2D;
   shoot: ShootTank;
   keys: KeysEvents;
   fireX: number;
   fireY: number;
   constructor(ctx: CanvasRenderingContext2D, tankX: number, tankY: number) {
      this.ctx = ctx;
      this.shoot = shootTank;
      this.keys = handlerEventsAndAngle();
      this.fireX = tankX;
      this.fireY = tankY;
   }

   update() {
      this.fireY -= 0.7;

      return { fireX: this.fireX, fireY: this.fireY };
   }

   render() {
      const img = window.resources.get(this.shoot.fireLink[0]);

      this.ctx.drawImage(img, this.fireX, this.fireY - 50);
   }
}
