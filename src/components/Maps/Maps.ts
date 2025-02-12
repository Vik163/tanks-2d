import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/lib/constants/init';
import { mapsBlocks } from './model/constants/blocks';
import { InfoBlock, MapGame } from './model/types/maps';
import { COLOR_LINE } from './model/constants/maps';

interface MapsProps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
}

export class Maps {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   private _$: (id: string) => HTMLElement | null;
   private blockHTML: HTMLElement | null | undefined;
   isSelectedBlock: InfoBlock | undefined;
   colorLine: string;
   cnvWidth: number;
   blockWidth: number;
   cnvHeight: number;
   blockHeight: number;
   private _keyOpenGrid: boolean;
   cursorCorrect: { X: number; Y: number };
   cursor: { X: number; Y: number };
   mapGame: MapGame;

   constructor({ cnv, ctx }: MapsProps) {
      this.cnv = cnv;
      this.ctx = ctx;
      this._$ = (id: string) => document.getElementById(id);
      this.colorLine = COLOR_LINE;
      this.cnvWidth = CANVAS_WIDTH;
      this.blockWidth = BLOCK_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockHeight = BLOCK_HEIGHT;
      this._keyOpenGrid = false;
      this.cursorCorrect = {
         X: (window.innerWidth - CANVAS_WIDTH) / 2 - BLOCK_WIDTH - 6,
         Y: 60,
      };
      this.mapGame = [];
      this.cursor = {
         X: 0,
         Y: 0,
      };
   }

   _handleMap(e: MouseEvent) {
      if (this._checkCoordScreen()) {
         const cellsCoordW = // коорд по width
            Math.round(this.cursor.X / BLOCK_WIDTH) * BLOCK_WIDTH;
         const cellsCoordH = // коорд по height
            Math.round(this.cursor.Y / BLOCK_HEIGHT) * BLOCK_HEIGHT;

         // проверка на существующий блок
         const isExist = this._checkCoordBlock(cellsCoordW, cellsCoordH);
         if (isExist) {
            // если находим - удаляем
            this.mapGame = this.mapGame.map((i) => {
               const [keyH, value] = Object.entries(i)[0];
               // находим нужный ряд
               if (keyH === String(cellsCoordH)) {
                  // фильтруем
                  const arr = value.filter((c) => {
                     const kW = Object.keys(c)[0];
                     return kW !== cellsCoordW.toString();
                  });
                  return { [keyH]: arr };
               } else {
                  // иначе возвращаем, что было
                  return i;
               }
            });
         } else {
            // иначе создаем новый
            // ключ объекта одного блока
            const keyW = `${cellsCoordW}`;
            const newBlock = {
               [keyW]: {
                  name: this.isSelectedBlock?.name,
                  link: this.isSelectedBlock?.link,
                  countHit: 0,
                  type: this.isSelectedBlock?.type,
                  coord: [cellsCoordW, cellsCoordH],
               },
            };

            this.mapGame.forEach((i) => {
               const [key, value] = Object.entries(i)[0];
               if (key === String(cellsCoordH)) {
                  value.push(newBlock);
               }
            });
         }

         console.log('newBlock:', this.mapGame);
      }
      this._updateScreen();
   }

   // проверка на существующий блок
   _checkCoordBlock(w: number, h: number): boolean {
      return this.mapGame.some((i) => {
         const [key, arr] = Object.entries(i)[0];
         if (key === h.toString()) {
            return arr.some((c) => {
               const k = Object.keys(c)[0];
               if (k === w.toString()) {
                  return true;
               }
               return false;
            });
         } else {
            return false;
         }
      });
   }

   _checkCoordScreen(): boolean {
      if (
         this.cursor.X < this.cnvWidth - BLOCK_WIDTH &&
         this.cursor.X >= 0 &&
         this.cursor.Y < this.cnvHeight - BLOCK_HEIGHT &&
         this.cursor.Y >= 0
      ) {
         return true;
      }
      return false;
   }

   _moveBlockByCursor(e: MouseEvent) {
      this.cursor.X = e.clientX - this.cursorCorrect.X;
      this.cursor.Y = e.clientY - this.cursorCorrect.Y;

      const imgBlock = new Image();
      if (this.isSelectedBlock) imgBlock.src = this.isSelectedBlock.link;
      this._updateScreen();
      this.ctx.drawImage(
         imgBlock,
         this.cursor.X,
         this.cursor.Y,
         this.blockWidth,
         this.blockHeight,
      );
   }

   _selectBlock(e: MouseEvent, block: InfoBlock) {
      if (e.target === this.blockHTML) {
         if (this.blockHTML?.classList.contains('editor__nav-btn_active')) {
            this.blockHTML?.classList.remove('editor__nav-btn_active');
            this.isSelectedBlock = undefined;
         } else {
            this.blockHTML?.classList.add('editor__nav-btn_active');
            this.isSelectedBlock = block;
         }
      } else {
         this.blockHTML?.classList.remove('editor__nav-btn_active');
         this.isSelectedBlock = undefined;

         this.blockHTML = this._$(block.name);
         this.blockHTML?.classList.add('editor__nav-btn_active');
         this.isSelectedBlock = block;
      }
   }

   _cancelSelectBlock() {
      this.blockHTML?.classList.remove('editor__nav-btn_active');
      this.isSelectedBlock = undefined;
   }

   _handleGrid() {
      if (!this._keyOpenGrid) {
         this._keyOpenGrid = true;
         this._drawGrid();
      } else {
         this._keyOpenGrid = false;

         this._updateScreen();
      }
   }

   _drawGrid() {
      for (let s = 0; s <= this.cnvWidth; s += this.blockWidth) {
         // координаты начала линии X,Y
         this.ctx.moveTo(s, 0);
         // команда рисования линии с координатами конца линии
         this.ctx.lineTo(s, this.cnvHeight);
         this.ctx.strokeStyle = this.colorLine; // цвет линии
         this.ctx.lineWidth = 1; // толщина линии
         this.ctx.stroke(); // обводка линии ершы
      }

      for (let s = 0; s <= this.cnvHeight; s += this.blockHeight) {
         // координаты начала линии X,Y
         this.ctx.moveTo(0, s);
         // команда рисования линии с координатами конца линии
         this.ctx.lineTo(this.cnvWidth, s);
         this.ctx.strokeStyle = this.colorLine; // цвет линии
         this.ctx.lineWidth = 1; // толщина линии
         this.ctx.stroke(); // обводка линии ершы
      }
   }

   _updateScreen() {
      this.cnv.width = this.cnvWidth;
      this.cnv.height = this.cnvHeight;

      if (this.mapGame.length > 0) {
         this.mapGame.forEach((i) => {
            const arr = Object.values(i)[0];
            arr.forEach((c) => {
               const bl = Object.values(c)[0];
               const newBl = new Image();
               newBl.src = bl.link!;

               this.ctx.drawImage(
                  newBl,
                  bl.coord[0],
                  bl.coord[1],
                  this.blockWidth,
                  this.blockHeight,
               );
            });
         });
      }

      if (this._keyOpenGrid) this._drawGrid();
   }

   _handleButtonsWithListeners() {
      const editorClass = this._$('editor_nav');

      // слушатель установки выбранного блока
      if (!editorClass?.classList.contains('editor__nav_active')) {
         editorClass?.classList.add('editor__nav_active');
         // слушатель кнопки установки сетки
         this._createButtonGrid();

         // установка блоков и слушателей в инфо
         mapsBlocks.forEach((i: InfoBlock) => {
            // создание и вставка блока в инфо
            this._createBlockInfo(i);
         });

         // слушатель установки выбранного блока
         this.cnv.addEventListener('click', (e: MouseEvent) => {
            if (this.isSelectedBlock) this._handleMap(e);
         });

         // слушатель движения мыши
         document.addEventListener('mousemove', (e: MouseEvent) =>
            this._moveBlockByCursor(e),
         );

         document.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Отменяем вызов стандартного контекстного меню браузера
            this._cancelSelectBlock();
            this._updateScreen();
         });
      } else {
         // удаление блоков и слушателей в инфо
         editorClass?.classList.remove('editor__nav_active');

         mapsBlocks.forEach((i: InfoBlock) => {
            this._deleteBlockInfo(i);
         });

         // удаление кнопки и слушателя Grid
         this._deleteButtonGrid();

         // слушатель установки выбранного блока
         this.cnv.removeEventListener('click', (e: MouseEvent) => {
            if (this.isSelectedBlock) this._handleMap(e);
         });

         // слушатель движения мыши
         document.removeEventListener('mousemove', (e: MouseEvent) =>
            this._moveBlockByCursor(e),
         );

         document.removeEventListener('contextmenu', (e) => {
            e.preventDefault(); // Отменяем вызов стандартного контекстного меню браузера
            this._cancelSelectBlock();
            this._updateScreen();
         });
      }
   }

   // установка атрибутов, слушателя и вставка кнопки Grid
   _deleteButtonGrid() {
      const gridBtn = this._$('map__grid-btn');

      gridBtn?.removeEventListener('click', () => {
         this._handleGrid();
      });
      gridBtn?.remove();
   }

   // установка атрибутов, слушателя и вставка кнопки Grid
   _createButtonGrid() {
      const btnCrid = document.createElement('button');
      btnCrid.setAttribute('id', 'map__grid-btn');
      btnCrid.setAttribute('type', 'button');
      btnCrid.classList.add('map__grid-btn');
      btnCrid.textContent = 'GRID';

      this._$('editor_nav')?.appendChild(btnCrid);

      btnCrid.addEventListener('click', () => {
         this._handleGrid();
      });
   }

   // удаление слушателей и блоков инфо
   _deleteBlockInfo(bl: InfoBlock) {
      const btn = this._$(bl.name);

      btn?.removeEventListener('click', (e: MouseEvent) => {
         this._selectBlock(e, bl);
      });
      btn?.remove();
   }

   // установка атрибутов, слушателей и вставка блоков инфо
   _createBlockInfo(bl: InfoBlock) {
      const btn = document.createElement('img');
      btn.setAttribute('src', bl.link);
      btn.setAttribute('id', bl.name);
      btn.setAttribute('alt', bl.name);
      btn.classList.add('editor__nav-btn');

      this._$('editor_nav')?.appendChild(btn);

      btn.addEventListener('click', (e: MouseEvent) => {
         this._selectBlock(e, bl);
      });
   }

   openEditor() {
      // Создаем карту - массив объектов рядов по оси Y
      if (!(this.mapGame.length > 0)) {
         for (let c = 0; c < CANVAS_HEIGHT; c += BLOCK_HEIGHT) {
            this.mapGame.push({ [c]: [] });
         }
      }

      this._handleButtonsWithListeners();
   }

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
