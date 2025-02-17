import { initLoadImg } from './lib/ImagesLoad';
import { Main } from './components/Main/Main';
import { Maps } from './components/Maps/Maps';
import './index.css';
import { arrSrcImg, map_1 } from './constants/maps';

function init() {
   const $ = (id: string) => document.getElementById(id);
   localStorage.setItem('map_1', JSON.stringify(map_1));

   const cnv = $('canvas') as HTMLCanvasElement;
   const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;

   const maps = new Maps({ cnv, ctx });
   const main = new Main(cnv, ctx, maps);

   let lastTime: number;

   initLoadImg();
   window.resources.load(arrSrcImg);

   function loopGame() {
      lastTime = Date.now();
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;

      main.update(dt);
      main.render();

      lastTime = now;
      requestAnimationFrame(loopGame);
   }

   window.resources.onReady(() => {
      loopGame();
   });

   $('btn_editor')?.addEventListener('click', () => maps.openEditor());
}

init();
