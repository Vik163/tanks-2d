export const handlerEvents = () => {
   let pressedKeys: Record<string, boolean> = {};

   function setKey(event: KeyboardEvent, status: boolean) {
      const code = event.code;
      let key: string;

      switch (code) {
         case 'Space':
            key = 'SPACE';
            break;
         case 'ArrowLeft':
            key = 'LEFT';
            break;
         case 'ArrowUp':
            key = 'UP';
            break;
         case 'ArrowRight':
            key = 'RIGHT';
            break;
         case 'ArrowDown':
            key = 'DOWN';
            break;
         default:
            key = code;
      }

      pressedKeys[key] = status;
   }

   document.addEventListener('keydown', (e) => setKey(e, true));

   document.addEventListener('keyup', (e) => setKey(e, false));

   window.addEventListener('blur', () => {
      pressedKeys = {};
   });

   return {
      isDown: (key: string) => pressedKeys[key.toUpperCase()],
   };
};
