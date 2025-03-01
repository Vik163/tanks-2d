import type { Dir } from '@/types/main';

export const handlerParameters = () => {
   let pressedKeys: Record<string, boolean> = {};
   let angle = 0;
   let dir: Dir = 'UP';
   const isMobile = window.matchMedia('(max-width: 1000px)').matches;

   const $ = (id: string) => document.getElementById(id);
   const fireBtn = $('btn__fire');
   const upBtn = $('btn__up');
   const downBtn = $('btn__down');
   const leftBtn = $('btn__left');
   const rightBtn = $('btn__right');
   const btns = {
      Space: fireBtn,
      ArrowUp: upBtn,
      ArrowDown: downBtn,
      ArrowLeft: leftBtn,
      ArrowRight: rightBtn,
   };

   function setKey(code: string, status: boolean) {
      let key: string;

      switch (code) {
         case 'Space':
            key = 'SPACE';

            break;
         case 'ArrowLeft':
            key = 'LEFT';
            dir = 'LEFT';
            angle = -90;

            break;
         case 'ArrowUp':
            key = 'UP';
            dir = 'UP';
            angle = 0;

            break;
         case 'ArrowRight':
            key = 'RIGHT';
            dir = 'RIGHT';
            angle = 90;

            break;
         case 'ArrowDown':
            key = 'DOWN';
            dir = 'DOWN';
            angle = 180;

            break;
         default:
            key = code;
            dir = 'UP';
            angle = 0;
      }

      pressedKeys[key] = status;
   }

   if (isMobile) {
      Object.entries(btns).forEach(([code, btn]) => {
         if (btn) {
            btn.addEventListener('touchstart', (ev) => {
               ev.preventDefault();
               setKey(code, true);
            });
            btn.addEventListener('touchend', () => setKey(code, false));
         }
      });
   } else {
      document.addEventListener('keydown', (e) => setKey(e.code, true));
      document.addEventListener('keyup', (e) => setKey(e.code, false));
   }

   window.addEventListener('blur', () => {
      pressedKeys = {};
   });

   return {
      isDown: (key: string) => {
         return { angle, dir, status: pressedKeys[key.toUpperCase()] };
      },
      isUp: (key: string) => pressedKeys[key.toUpperCase()],
   };
};
