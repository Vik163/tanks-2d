import type { Dir } from '@/types/main';

export const handlerParameters = () => {
   let pressedKeys: Record<string, boolean> = {};
   let angle = 0;
   let dir: Dir = 'UP';

   function setKey(event: KeyboardEvent, status: boolean) {
      const code = event.code;
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

   document.addEventListener('keydown', (e) => setKey(e, true));

   document.addEventListener('keyup', (e) => setKey(e, false));

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
