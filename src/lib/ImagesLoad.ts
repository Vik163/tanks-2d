export function initLoadImg() {
   const resourceCacheImg: Record<string, HTMLImageElement> = {};
   const resourceCacheSound: Record<string, HTMLAudioElement> = {};
   const loading = [];
   const readyCallbacks: Array<() => void> = [];

   // Load an image url or an array of image urls
   function loadImg(urlOrArr: string | string[]) {
      if (urlOrArr instanceof Array) {
         urlOrArr.forEach(function (url) {
            _loadImg(url);
         });
      } else {
         _loadImg(urlOrArr);
      }
   }

   function loadSound(urlOrArr: string | string[]) {
      if (urlOrArr instanceof Array) {
         urlOrArr.forEach(function (url) {
            _loadSound(url);
         });
      } else {
         _loadSound(urlOrArr);
      }
   }

   function _loadSound(url: string) {
      if (resourceCacheSound[url]) {
         return resourceCacheSound[url];
      } else {
         const sound = new Audio(url);
         sound.onload = function () {
            if (isReady()) {
               readyCallbacks.forEach(function (func) {
                  func();
               });
            }
         };

         resourceCacheSound[url] = sound;
      }
   }

   function _loadImg(url: string) {
      if (resourceCacheImg[url]) {
         return resourceCacheImg[url];
      } else {
         const img = new Image();
         img.onload = function () {
            if (isReady()) {
               readyCallbacks.forEach(function (func) {
                  func();
               });
            }
         };

         resourceCacheImg[url] = img;
         img.src = url;
      }
   }

   function getImg(url: string) {
      return resourceCacheImg[url];
   }

   function getSound(url: string) {
      return resourceCacheSound[url];
   }

   function isReady() {
      let ready = true;
      for (const k in resourceCacheImg) {
         if (
            Object.prototype.hasOwnProperty.call(resourceCacheImg, k) &&
            !resourceCacheImg[k]
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
      loadImg,
      loadSound,
      getImg,
      getSound,
      onReady,
      isReady,
   };
}
