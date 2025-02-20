export {};

declare global {
   interface Window {
      resources: {
         loadImg: (urlOrArr: string | string[]) => void;
         loadSound: (urlOrArr: string | string[]) => void;
         getImg: (url: string) => HTMLImageElement;
         getSound: (url: string) => HTMLAudioElement;
         onReady: (func: () => void) => void;
         isReady: () => boolean;
      };
   }
}
