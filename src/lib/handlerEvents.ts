export const handlerEventsAndAngle = () => {
   let pressedKeys: Record<string, boolean> = {};
   let angle = 0;

   function setKey(event: KeyboardEvent, status: boolean) {
      const code = event.code;
      let key: string;

      switch (code) {
         case 'Space':
            key = 'SPACE';

            break;
         case 'ArrowLeft':
            key = 'LEFT';
            angle = -90;
            break;
         case 'ArrowUp':
            key = 'UP';
            angle = 0;

            break;
         case 'ArrowRight':
            key = 'RIGHT';
            angle = 90;

            break;
         case 'ArrowDown':
            key = 'DOWN';
            angle = 180;

            break;
         default:
            key = code;
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
         return { angle, status: pressedKeys[key.toUpperCase()] };
      },
      isUp: (key: string) => pressedKeys[key.toUpperCase()],
   };
};
