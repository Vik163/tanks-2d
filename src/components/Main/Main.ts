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
import { Maps } from '../Maps/Maps';
import { MyTank } from '../MyTank/MyTank';
import { soundsLinks } from '@/constants/sounds';
import type { Sounds } from '@/types/sounds';
import type { KeysEvents } from '@/types/main';
import { handlerParameters } from '@/lib/handlerParameters';
import { Shooting } from '../Shooting/Shooting';
import { Enemies } from '../Enemies/Enemies';

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
   enemies: Enemies;
   sounds: Sounds;
   keys: KeysEvents;
   shooting: Shooting;
   btnSound: HTMLAudioElement;
   isMobile: boolean;

   constructor(btnSound: HTMLAudioElement, isMobile: boolean) {
      this._$ = (id: string) => document.getElementById(id)!;
      this.cnv = this._$('canvas') as HTMLCanvasElement;
      this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
      this.dt = 0;
      this.cnvWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.cnvHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT;
      this.blockHeight = isMobile ? BLOCK_HEIGHT_MOBILE : BLOCK_HEIGHT;
      this.keyGame = false;
      this.keys = handlerParameters();
      this.btn = document.getElementById('btn_start')!;
      this.intervalId = undefined;
      this.btnSound = btnSound;
      this.maps = new Maps(
         { cnv: this.cnv, ctx: this.ctx },
         btnSound,
         isMobile,
      );
      this.myTank = new MyTank(this.ctx, isMobile);
      this.sounds = soundsLinks;
      this.shooting = new Shooting(this.ctx, isMobile);
      this.enemies = new Enemies(this.ctx, isMobile);
      this.isMobile = isMobile;
   }

   addListeners() {
      const btnFullScreen = this._$('fullscreen');
      const observer = this._$('observer__fullscreen');

      this._$('btn_editor')?.addEventListener('click', () => {
         this.btnSound.play();
         if (!this.keyGame) this.maps.openEditor();
      });
      // полноэкранный режим в mobile
      btnFullScreen?.addEventListener(
         'click',
         () => {
            // если элемент уже в полноэкранном режиме, выйти из него
            // В противном случае войти в полный экран
            if (document.fullscreenElement) {
               btnFullScreen?.classList.remove('fullscreen_active');
               document.exitFullscreen();
               if (observer) observer.style.display = 'none';
            } else {
               document.documentElement.requestFullscreen();
               btnFullScreen?.classList.add('fullscreen_active');
               btnFullScreen?.classList.add('fullscreen_hidden');
               if (observer) observer.style.display = 'block';
            }
         },
         false,
      );

      observer?.addEventListener('click', () => {
         btnFullScreen?.classList.remove('fullscreen_hidden');

         if (observer) observer.style.display = 'none';
      });
   }

   actionsBtn(
      act: string,
      pauseIn: HTMLAudioElement,
      pauseOut: HTMLAudioElement,
   ) {
      if (act === 'START') {
         if (this.btn.textContent === 'START') {
            this.keyGame = true;

            this.btn.textContent = 'PAUSE';
         } else {
            if (this.btn.textContent === 'PAUSE') {
               this.btn.textContent = 'PAUSE*';
               pauseIn.play();
            } else {
               this.btn.textContent = 'PAUSE';
               pauseOut.play();
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
      this.enemies.update();
      this.shooting.update();
   }

   render() {
      this.cnv.width = this.cnvWidth;
      this.cnv.height = this.cnvHeight;

      this.maps.renderMap();
      this.myTank.renderMyTank();
      this.enemies.render();
      this.shooting.render();
   }
}
