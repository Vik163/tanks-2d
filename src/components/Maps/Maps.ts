import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { mapsBlocks } from './model/constants/blocks';
import type { InfoBlock } from './model/types/maps';
import type { CnvProps } from '@/types/main';
import type { Block, MapGame, PlacesStart } from '@/types/map';

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
   cursor: { X: number; Y: number };
   mapGame: MapGame;
   keyMouse: boolean;
   placesStart: PlacesStart;
   btnSound: HTMLAudioElement;

   constructor({ cnv, ctx }: CnvProps, btnSound: HTMLAudioElement) {
      this.cnv = cnv;
      this.ctx = ctx;
      this._$ = (id: string) => document.getElementById(id);
      this.colorLine = 'rgb(1, 159, 1)';
      this.cnvWidth = CANVAS_WIDTH;
      this.blockWidth = BLOCK_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockHeight = BLOCK_HEIGHT;
      this._keyOpenGrid = false;
      this.mapGame = JSON.parse(localStorage.getItem('map_1')!);
      this.cursor = {
         X: 0,
         Y: 0,
      };
      this.keyMouse = false;
      this.placesStart = JSON.parse(localStorage.getItem('placesStartMap_1')!);
      this.btnSound = btnSound;
   }

   renderMap() {
      this.mapGame = JSON.parse(localStorage.getItem('map_1')!);

      // карта из localStorage
      this._initRender();
      // cетка
      if (this._keyOpenGrid) this._drawGrid();
      // двигающийся блок
      if (this.isSelectedBlock) {
         this._renderBlockbyCursor();
      }
   }

   _getImg(bl: Block) {
      let link: string = '';

      if (bl.countHit === 1) link = bl.linkHit1 ? bl.linkHit1 : '';

      if (bl.countHit > 1) link = bl.linkDel ? bl.linkDel : '';

      if (bl.countHit === 0) link = bl.link ? bl.link : '';
      return link;
   }

   _initRender() {
      Object.values(this.mapGame).forEach((arr) => {
         arr.forEach((c) => {
            const link = c.type === 'bricks' ? this._getImg(c) : c.link;
            const img = window.resources.get(link!);
            this.ctx.drawImage(
               img,
               c.coord[0],
               c.coord[1],
               this.blockWidth,
               this.blockHeight,
            );
         });
      });
      this.placesStart?.forEach((pl) => {
         const img = window.resources.get(pl.link!);
         this.ctx.drawImage(
            img,
            pl.coord[0],
            pl.coord[1],
            this.blockWidth,
            this.blockHeight,
         );
      });
   }

   _handleGrid() {
      if (!this._keyOpenGrid) {
         this._keyOpenGrid = true;
         this._drawGrid();
      } else {
         this._keyOpenGrid = false;
      }
   }

   _editMap() {
      if (this._checkCoordScreen()) {
         const cellsCoordW = // коорд по width
            Math.round(this.cursor.X / BLOCK_WIDTH) * BLOCK_WIDTH;
         const cellsCoordH = // коорд по height
            Math.round(this.cursor.Y / BLOCK_HEIGHT) * BLOCK_HEIGHT;

         // проверка на существующий блок
         const isExist = this._checkCoordBlock(cellsCoordW, cellsCoordH);
         if (isExist) {
            // если находим - удаляем
            const arr = this.mapGame[cellsCoordH].filter(
               (c) => c.coord[0] !== cellsCoordW,
            );

            this.placesStart = this.placesStart.filter(
               (pl) =>
                  pl.coord[0] !== cellsCoordW || pl.type === 'placeMyStart',
            );

            this.mapGame = {
               ...this.mapGame,
               [cellsCoordH]: arr,
            };
         } else {
            // иначе создаем новый
            const newBlock: Block = {
               part: 'map',
               link: this.isSelectedBlock?.link,
               nameId: this.isSelectedBlock?.nameId,
               linkHit1: this.isSelectedBlock?.linkHit1,
               linkHit2: this.isSelectedBlock?.linkHit2,
               linkDel: this.isSelectedBlock?.linkDel,
               countHit: 0,
               type: this.isSelectedBlock?.type,
               coord: [cellsCoordW, cellsCoordH],
            };

            // либо блоки, либо места старта
            if (newBlock.type === 'placeStart') {
               this.placesStart.push(newBlock);
            } else if (newBlock.type !== 'placeMyStart') {
               if (this.mapGame[cellsCoordH]) {
                  this.mapGame[cellsCoordH].push(newBlock);
               } else {
                  this.mapGame = {
                     ...this.mapGame,
                     [cellsCoordH]: [newBlock],
                  };
               }
            }
         }

         localStorage.setItem('map_1', JSON.stringify(this.mapGame));
         localStorage.setItem(
            'placesStartMap_1',
            JSON.stringify(this.placesStart),
         );
      }
   }

   // проверка на существующий блок
   _checkCoordBlock(w: number, h: number): boolean {
      return !!(
         (this.mapGame[h] && this.mapGame[h].some((c) => c.coord[0] === w)) ||
         this.placesStart.some((pl) => pl.coord[0] === w)
      );
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
      const rect = this.cnv.getBoundingClientRect();
      this.cursor.X = e.clientX - rect.x - 20;
      this.cursor.Y = e.clientY - rect.y - 20;
   }

   _renderBlockbyCursor() {
      if (this.isSelectedBlock) {
         const img = window.resources.get(this.isSelectedBlock.link!);
         this.ctx.drawImage(
            img,
            this.cursor.X,
            this.cursor.Y,
            this.blockWidth,
            this.blockHeight,
         );
      }
   }

   _selectBlock(e: MouseEvent, block: InfoBlock) {
      const removeSelect = () => {
         this.blockHTML?.classList.remove('editor__nav-btn_active');
         this.isSelectedBlock = undefined;
         this.keyMouse = false;
         this.cursor.X = this.cnvWidth;
      };

      const addSelect = () => {
         this.blockHTML?.classList.add('editor__nav-btn_active');
         this.isSelectedBlock = block;
         this.keyMouse = true;
      };

      if (e.target === this.blockHTML) {
         if (this.blockHTML?.classList.contains('editor__nav-btn_active')) {
            removeSelect();
         } else {
            addSelect();
         }
      } else {
         removeSelect();

         if (block.nameId) this.blockHTML = this._$(block.nameId);
         addSelect();
      }
   }

   _cancelSelectBlock() {
      this.blockHTML?.classList.remove('editor__nav-btn_active');
      this.isSelectedBlock = undefined;
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
         this.cnv.addEventListener('click', () => {
            if (this.isSelectedBlock) this._editMap();
         });

         // слушатель движения мыши
         document.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.isSelectedBlock) this._moveBlockByCursor(e);
         });

         document.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Отменяем вызов стандартного контекстного меню браузера
            this._cancelSelectBlock();
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
         this.cnv.removeEventListener('click', () => {
            if (this.isSelectedBlock) this._editMap();
         });

         // слушатель движения мыши
         document.removeEventListener('mousemove', (e: MouseEvent) => {
            if (this.isSelectedBlock) this._moveBlockByCursor(e);
         });

         document.removeEventListener('contextmenu', (e) => {
            e.preventDefault(); // Отменяем вызов стандартного контекстного меню браузера
            this._cancelSelectBlock();
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
         this.btnSound.play();
         this._handleGrid();
      });
   }

   // удаление слушателей и блоков инфо
   _deleteBlockInfo(bl: InfoBlock) {
      const btn = this._$(bl.nameId ? bl.nameId : '');

      btn?.removeEventListener('click', (e: MouseEvent) => {
         this._selectBlock(e, bl);
      });
      btn?.remove();
   }

   // установка атрибутов, слушателей и вставка блоков инфо
   _createBlockInfo(bl: InfoBlock) {
      const btn = document.createElement('img');
      if (bl.link) btn.setAttribute('src', bl.link);
      if (bl.nameId) {
         btn.setAttribute('id', bl.nameId);
         btn.setAttribute('alt', bl.nameId);
      }
      btn.classList.add('editor__nav-btn');

      this._$('editor_nav')?.appendChild(btn);

      btn.addEventListener('click', (e: MouseEvent) => {
         this.btnSound.play();
         this._selectBlock(e, bl);
      });
   }

   openEditor() {
      // Создаем карту - массив объектов рядов по оси Y
      if (Object.keys(this.mapGame).length === 0) {
         for (let coord = 0; coord < CANVAS_HEIGHT; coord += BLOCK_HEIGHT) {
            this.mapGame[coord] = [];
         }
      }

      this._handleButtonsWithListeners();
   }
}
