import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { Maps } from '../Maps/Maps';
import { MyTank } from '../MyTank/MyTank';
import { soundsLinks } from '@/constants/sounds';
import type { Sounds } from '@/types/sounds';
import type { KeysEvents } from '@/types/main';
import { handlerParameters } from '@/lib/handlerParameters';
import { Shooting } from '../Shooting/Shooting';

export class Main {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   dt: number;
   cnvWidth: number;
   cnvHeight: number;
   blockWidth: number;
   blockHeight: number;
   maps: Maps;
   keyGame: boolean;
   btn: HTMLElement;
   intervalId: string | number | NodeJS.Timeout | undefined;
   _$: (id: string) => HTMLElement | null;
   myTank: MyTank;
   sounds: Sounds;
   keys: KeysEvents;
   shooting: Shooting;

   constructor() {
      this._$ = (id: string) => document.getElementById(id)!;
      this.cnv = this._$('canvas') as HTMLCanvasElement;
      this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
      this.dt = 0;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.keyGame = false;
      this.keys = handlerParameters();
      this.btn = document.getElementById('btn_start')!;
      this.intervalId = undefined;
      this.maps = new Maps({ cnv: this.cnv, ctx: this.ctx });
      this.myTank = new MyTank(this.ctx);
      this.sounds = soundsLinks;
      this.shooting = new Shooting(this.ctx);
   }

   addListeners() {
      this._$('btn_editor')?.addEventListener('click', () => {
         if (!this.keyGame) this.maps.openEditor();
      });
   }

   actionsBtn(act: string) {
      if (act === 'START') {
         if (this.btn.textContent === 'START') {
            this.keyGame = true;

            this.btn.textContent = 'PAUSE';
         } else {
            if (this.btn.textContent === 'PAUSE') {
               this.btn.textContent = 'PAUSE*';
            } else {
               this.btn.textContent = 'PAUSE';
            }
            if (!this.intervalId) {
               this.intervalId = setInterval(() => {
                  this.btn.classList.toggle('btn_start_active');

                  if (this.btn.textContent === 'PAUSE') {
                     clearInterval(this.intervalId);
                     this.intervalId = undefined;

                     this.btn.classList.remove('btn_start_active');
                  }
               }, 1000);
            }
         }
      } else {
         clearInterval(this.intervalId);
         this.intervalId = undefined;
         this.btn.classList.remove('btn_start_active');

         this.keyGame = false;
         this.btn.textContent = 'START';
      }

      return this.keyGame;
   }

   update() {
      this.myTank.update();
      this.shooting.update();
   }

   render() {
      this.cnv.width = this.cnvWidth;
      this.cnv.height = this.cnvHeight;

      this.maps.renderMap();
      this.myTank.renderMyTank();
      this.shooting.render();
   }
}
