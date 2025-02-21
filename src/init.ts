import { initLoadImg } from './lib/ImagesLoad';
import { Main } from './components/Main/Main';
import './index.css';
import { map_1 } from './constants/maps';
import { mapsBlocks } from './components/Maps/model/constants/blocks';
import { InfoBlock } from './components/Maps/model/types/maps';
import { arrSrcImg } from './constants/images';
import { soundsLinks } from './constants/sounds';

function init() {
   const $ = (id: string) => document.getElementById(id);

   localStorage.setItem('map_1', JSON.stringify(map_1));

   let keyGame = false;

   const main = new Main();

   initLoadImg();
   window.resources.load(arrSrcImg);

   function loopGame() {
      // if (keyGame) {
      main.update();
      main.render();
      // }

      requestAnimationFrame(loopGame);
   }

   window.resources.onReady(() => {
      loopGame();
   });

   const tune_1 = new Audio(soundsLinks.tune_1);

   $('btn_start')?.addEventListener('click', () => {
      tune_1.play();
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
      tune_1.pause();
      tune_1.currentTime = 0;
   });

   main.addListeners();
}

init();
