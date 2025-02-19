export function initLoadImg() {
   const resourceCache: Record<string, HTMLImageElement> = {};
   const loading = [];
   const readyCallbacks: Array<() => void> = [];

   // Load an image url or an array of image urls
   function load(urlOrArr: string | string[]) {
      if (urlOrArr instanceof Array) {
         urlOrArr.forEach(function (url) {
            _load(url);
         });
      } else {
         _load(urlOrArr);
      }
   }

   function _load(url: string) {
      if (resourceCache[url]) {
         return resourceCache[url];
      } else {
         const img = new Image();
         img.onload = function () {
            if (isReady()) {
               readyCallbacks.forEach(function (func) {
                  func();
               });
            }
         };

         resourceCache[url] = img;
         img.src = url;
      }
   }

   function get(url: string) {
      return resourceCache[url];
   }

   function isReady() {
      let ready = true;
      for (const k in resourceCache) {
         if (
            Object.prototype.hasOwnProperty.call(resourceCache, k) &&
            !resourceCache[k]
         ) {
            ready = false;
         }
      }
      return ready;
   }

   function onReady(func: () => void) {
      readyCallbacks.push(func);
   }

   window.resources = {
      load,
      get,
      onReady,
      isReady,
   };
}
