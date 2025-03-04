import { initLoadImg } from './lib/ImagesLoad';
import { Main } from './components/Main/Main';
import './styles/index.css';
import { map_1, placesStartMap_1 } from './constants/maps';
import { mapsBlocks } from './components/Maps/model/constants/blocks';
import { InfoBlock } from './components/Maps/model/types/maps';
import { arrSrcImg } from './constants/images';
import { soundsLinks } from './constants/sounds';

function init() {
   const $ = (id: string) => document.getElementById(id);
   const isMobile = window.matchMedia('(max-width: 1000px)').matches;

   localStorage.setItem('map_1', JSON.stringify(map_1));
   localStorage.setItem('placesStartMap_1', JSON.stringify(placesStartMap_1));

   let keyGame = false;

   const tune_1 = new Audio(soundsLinks.tune_1);
   const btnSound = new Audio(soundsLinks.button);
   const pauseIn = new Audio(soundsLinks.timeStopIn);
   const pauseOut = new Audio(soundsLinks.timeStopOut);
   const btnStop = $('btn_stop');
   const btnStart = $('btn_start');

   const main = new Main(btnSound, isMobile);

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

   btnStart?.addEventListener('click', () => {
      tune_1.play();
      btnSound.play();
      keyGame = main.actionsBtn('START', pauseIn, pauseOut);
      // Закрыть блок редактора карты при запуске игры
      $('map__grid-btn')?.remove();
      $('editor_nav')?.classList.remove('editor__nav_active');
      mapsBlocks.forEach((i: InfoBlock) => {
         if (i.nameId) $(i.nameId)?.remove();
      });
      btnStart?.blur(); // для отмены одновременного срабатывания space и click
   });
   btnStop?.addEventListener('click', () => {
      btnSound.play();

      keyGame = main.actionsBtn('STOP', pauseIn, pauseOut);
      tune_1.pause();
      tune_1.currentTime = 0;
      btnStop?.blur();
   });

   main.addListeners();
}

init();
