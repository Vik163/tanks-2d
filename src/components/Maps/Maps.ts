import { mapsBlocks } from './model/constants/blocks';
import { MapsBlocks } from './model/types/maps';

interface MapsProps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
}

export class Maps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   private _$: (id: string) => HTMLElement | null;
   private blockMap: HTMLElement | null | undefined;

   constructor({ cnv, ctx }: MapsProps) {
      this.cnv = cnv;
      this.ctx = ctx;
      this._$ = (id: string) => document.getElementById(id);
   }

   openEditor() {
      this._handleButtonsWithListeners();
   }

   _selectBlock(block: MapsBlocks) {
      this.blockMap?.classList.remove('editor__nav-btn_active');

      this.blockMap = this._$(block.name);
      this.blockMap?.classList.add('editor__nav-btn_active');
   }

   _handleButtonsWithListeners() {
      const editorClass = this._$('editor_nav');
      if (!editorClass?.classList.contains('editor__nav_active')) {
         editorClass?.classList.add('editor__nav_active');

         mapsBlocks.forEach((i: MapsBlocks) => {
            const btn = document.createElement('img');
            btn.setAttribute('src', i.link);
            btn.setAttribute('id', i.name);
            btn.setAttribute('alt', i.name);
            btn.classList.add('editor__nav-btn');

            this._$('editor_nav')?.appendChild(btn);

            btn.addEventListener('click', () => {
               this._selectBlock(i);
            });
         });
      } else {
         editorClass?.classList.remove('editor__nav_active');

         mapsBlocks.forEach((i: MapsBlocks) => {
            const btn = this._$(i.name);

            btn?.removeEventListener('click', () => {
               this._selectBlock(i);
            });
            btn?.remove();
         });
      }
   }

   _handleGrid() {}

   // bg.onload = drawImageActualSize;

   // function drawImageActualSize() {
   //   // Use the intrinsic size of image in CSS pixels for the canvas element

   //   // Will draw the image as 300x227, ignoring the custom size of 60x45
   //   // given in the constructor
   //   ctx.drawImage(bg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

   //   // To use the custom size we'll have to specify the scale parameters
   //   // using the element's width and height properties - lets draw one
   //   // on top in the corner:
   //   // ctx.drawImage(this, 0, 0, this.width, this.height);
   // }

   // for (let i = 0; i < 6; i++) {
   //   for (let j = 0; j < 6; j++) {
   //     ctx.fillStyle = `rgb(
   //         ${Math.floor(255 - 42.5 * i)}
   //         ${Math.floor(255 - 42.5 * j)}
   //         0)`;
   //     ctx.fillRect(j * 25, i * 25, 25, 25);
   //   }
   // }
}
