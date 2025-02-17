export {};

declare global {
   interface Window {
      resources: {
         load: (urlOrArr: string | string[]) => void;
         get: (url: string) => HTMLImageElement;
         onReady: (func: () => void) => void;
         isReady: () => boolean;
      };
   }
}
