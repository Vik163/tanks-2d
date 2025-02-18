import { initLoadImg } from './lib/ImagesLoad';
import { Main } from './components/Main/Main';
import './index.css';
import { map_1 } from './constants/maps';
import { mapsBlocks } from './components/Maps/model/constants/blocks';
import { InfoBlock } from './components/Maps/model/types/maps';
import { arrSrcImg } from './constants/images';

function init() {
   const $ = (id: string) => document.getElementById(id);

   localStorage.setItem('map_1', JSON.stringify(map_1));

   let keyGame = false;

   const main = new Main();

   let lastTime: number;

   initLoadImg();
   window.resources.load(arrSrcImg);

   function loopGame() {
      lastTime = Date.now();
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;

      // if (keyGame) {
      main.update(dt);
      main.render();
      // }

      lastTime = now;
      requestAnimationFrame(loopGame);
   }

   window.resources.onReady(() => {
      loopGame();
   });

   $('btn_start')?.addEventListener('click', () => {
      keyGame = main.actionsBtn('START');
      // Закрыть блок редактора карты при запуске игры
      $('map__grid-btn')?.remove();
      $('editor_nav')?.classList.remove('editor__nav_active');
      mapsBlocks.forEach((i: InfoBlock) => {
         $(i.name)?.remove();
      });
   });
   $('btn_stop')?.addEventListener('click', () => {
      keyGame = main.actionsBtn('STOP');
   });

   main.addListeners();
}

init();
