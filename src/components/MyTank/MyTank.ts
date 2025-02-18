import { handlerEvents } from '@/lib/handlerEvents';
import { myTank } from './constants/myTank';
import type { IMyTank } from './types/myTank';

export class MyTank {
   ctx: CanvasRenderingContext2D;
   myTank: IMyTank;
   gameTime: number;
   input: {
      isDown: (key: string) => boolean;
      // isUp: (key: string) => boolean;
   };

   constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.myTank = myTank;
      this.input = handlerEvents();
      this.gameTime = 0;
   }

   update(dt: number) {
      this.gameTime += dt;
      if (this.input.isDown('UP')) {
         console.log('this.myTank.coord[1]:', this.myTank.coord[1]);
         console.log('dt:', this.gameTime);
         this.myTank.coord[1] -= 0.5;
      }
   }

   // addListeners() {
   //    document.addEventListener('keydown', (e: KeyboardEvent) =>
   //       this._handlerEvents(e),
   //    );
   // }

   // _handlerEvents(e: KeyboardEvent) {
   //    console.log('e:', e);
   //    if (e.code === 'Space') console.log(e.key);
   // }

   renderMyTank() {
      // console.log('SPACE', this.input.isDown('SPACE'));
      // console.log('Up', this.input.isDown('UP'));
      // console.log('Right', this.input.isDown('RIGHT'));
      // console.log('Left', this.input.isDown('LEFT'));
      // console.log('Down', this.input.isDown('DOWN'));

      const img = window.resources.get(this.myTank.img);
      this.ctx.drawImage(img, this.myTank.coord[0], this.myTank.coord[1]);
   }
}
