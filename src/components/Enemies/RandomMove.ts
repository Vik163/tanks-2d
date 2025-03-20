import { BLOCK_WIDTH, BLOCK_WIDTH_MOBILE, directions } from '@/constants/init';
import { checkCollisions } from '@/lib/checkCollisions';
import type { Dir, Directions, TypeVerifiable } from '@/types/main';
import type { Block } from '@/types/map';

interface CoordCell {
   numCellY: number;
   numCellX: number;
   cellX: number;
   cellY: number;
}

export class RandomMove {
   isMobile: boolean;
   _dir: Dir;
   _enemyX: number;
   _enemyY: number;
   blockWidth: number;
   _angle: number; //! рабочие углы поворота (-90, 0, 90, 180)
   checkCollisions: (
      dir: string,
      x: number,
      y: number,
      type: TypeVerifiable,
      isMobile: boolean,
   ) => Block | boolean;
   _timer: number;
   _timerMoveDown: number;
   _timerDelay: number;
   _timerDownDelay: number;
   _coordCell: CoordCell;
   _countMoveDown: number; // счетчик движений вниз по постоянной координате х (ограничивает количество повторов)
   _closeDir: [Dir?]; // массив закрытых направлений
   _directions: Directions;
   _randomCellCoord: number; // случайная клетка остановки при движении влево
   _k: number; // коэффициент скорости поворота
   _dirTurn: { dir: 'clockwise' | 'anticlockwise' | ''; angle: number }; // направление и угол поворота

   constructor(isMobile: boolean, dir: Dir, coord: number[]) {
      this.isMobile = isMobile;
      this._dir = dir;
      this._enemyX = coord[0];
      this._enemyY = coord[1];
      this._angle = 0;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.checkCollisions = checkCollisions;
      this._timer = 0;
      this._timerMoveDown = 0;
      this._timerDelay = 2000;
      this._timerDownDelay = 2000;
      this._coordCell = { numCellX: 0, numCellY: 0, cellX: 0, cellY: 0 };
      this._directions = directions;
      this._randomCellCoord = 0;
      this._countMoveDown = 0;
      this._closeDir = [];
      this._k = 0.3;
      this._dirTurn = { dir: '', angle: 0 };
   }

   update(x: number, y: number, coordCell: CoordCell) {
      this._enemyX = x;
      this._enemyY = y;
      this._coordCell = coordCell;

      return {
         dir: this._dir,
         angle: this._angle,
         obstacles: !this._checkObstacles(),
      };
   }

   // == меняет направление и добавляет в массив закрытое направление, управляет счетчиком движения вниз ==
   _changeDir(dir: Dir) {
      this._dir = dir;
      if (dir === 'RIGHT') {
         this._closeDir.push('RIGHT');
         this._countMoveDown = 0;
         this._handleAngleTurn(90);
      } else if (dir === 'LEFT') {
         this._closeDir.push('LEFT');
         this._countMoveDown = 0;
         this._handleAngleTurn(-90);
      } else if (dir === 'DOWN') {
         this._closeDir.push('DOWN');
         this._countMoveDown++;
         this._handleAngleTurn(180);
      } else if (dir === 'UP') {
         this._closeDir.push('UP');
         this._handleAngleTurn(0);
      }
   }

   // == устанавливает угол поворота в зависимости от текущего направления
   // ничего лучше не придумал
   _handleAngleTurn(newAngle: number) {
      if (newAngle === -90 && this._angle !== -90) {
         if (this._angle < 89)
            this._dirTurn = { dir: 'anticlockwise', angle: -90 };
         else this._dirTurn = { dir: 'clockwise', angle: 270 };
      } else if (newAngle === 0 && this._angle !== 0) {
         if (this._angle <= 0) this._dirTurn = { dir: 'clockwise', angle: 0 };
         else this._dirTurn = { dir: 'anticlockwise', angle: 0 };
      } else if (newAngle === 90 && this._angle !== 90) {
         if (this._angle < 89) this._dirTurn = { dir: 'clockwise', angle: 90 };
         else this._dirTurn = { dir: 'anticlockwise', angle: 90 };
      } else if (
         newAngle === 180 &&
         this._angle !== 180 &&
         this._angle !== -180
      ) {
         if (this._angle <= 0)
            this._dirTurn = { dir: 'anticlockwise', angle: -180 };
         else this._dirTurn = { dir: 'clockwise', angle: 180 };
      }
   }

   _turnEnemy() {
      // == остановка, небольшая задержка, поворот ==
      if (this._timer > this._timerDelay / 2) {
         if (this._dirTurn.dir === 'clockwise') {
            if (this._dirTurn.angle > this._angle) this._angle += this._k;
         } else {
            if (this._dirTurn.angle < this._angle) this._angle -= this._k;
         }
      }
      // ==  установка правильных углов после поворота (-90, 0, 90, 180) ==
      if (this._timer === this._timerDelay) {
         if (this._dir === 'DOWN') this._timerMoveDown = 0; // таймер обстрела нижнего блока

         if (this._dirTurn.angle === 270) {
            this._angle = -90;
            this._dirTurn.angle = -90;
         } else if (this._dirTurn.angle === -180) {
            this._angle = 180;
            this._dirTurn.angle = 180;
         } else this._angle = this._dirTurn.angle;
      }
   }

   _getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   _checkObstacles() {
      // проверка столкновений
      // первое столкновение
      const nodeCollision = this.checkCollisions(
         this._dir,
         Math.ceil(this._enemyX),
         this._enemyY,
         'enemy',
         this.isMobile,
      );

      this._timer++; // таймер поворота
      this._timerMoveDown++; // таймер обстрела нижнего блока
      if (
         this._dir === 'DOWN' &&
         this._timerMoveDown < this._timerDownDelay &&
         nodeCollision
      )
         return true;

      //* === задержка движения для поворота ====
      if (this._timer <= this._timerDelay) {
         this._turnEnemy();
         return true;
      }
      if (this._timer > this._timerDelay + 500) {
         this._closeDir = [];
      }

      if (nodeCollision) {
         this._checkDir();

         this._timer = 0; // запускает таймер поворота
      }

      // случайная клетка остановки и выбора другого направления при движении влево
      console.log('this._randomCellCoord:', this._randomCellCoord);
      if (this._dir === 'LEFT' && this._randomCellCoord >= this._enemyX) {
         this._timer = 0; // запускает таймер поворота
         this._changeDir('DOWN'); // поворачивает вниз и стреляет пока задержка
      }

      return false;
   }

   _checkDir() {
      // задержка поворота и проверка свободного направления
      // первая проверка вниз
      const checkDown = this.checkCollisions(
         'DOWN',
         this._enemyX,
         this._enemyY,
         'enemy',
         this.isMobile,
      );

      // если свободно, то идет вниз (в массиве направлений нет ключа 'DOWN' и счетчик не заполнен)
      if (
         (!this._closeDir.some((d) => d === 'DOWN') ||
            this._closeDir.length === 0) &&
         !checkDown &&
         this._countMoveDown < 2
      ) {
         this._changeDir('DOWN');

         // иначе выбирает случайное свободное направление
      } else {
         let checkDir: Block | boolean = true;
         const maxIntRandom =
            this._coordCell.numCellX - 3 > 0 ? this._coordCell.numCellX - 3 : 0;

         //* === выбор случайного места остановки при движении влево ===============
         this._randomCellCoord =
            this._getRandomInt(1, maxIntRandom) * this.blockWidth;

         // цикл проверки свободных направлений кроме "вниз"
         while (checkDir) {
            const randomDir = this._getRandomInt(
               1,
               this._directions.length - 1,
            );
            const newDir = this._directions[randomDir];

            checkDir = !this.checkCollisions(
               newDir,
               this._enemyX,
               this._enemyY,
               'enemy',
               this.isMobile,
            );

            // если находит свободное направление, которого нет в массиве, то меняет
            if (
               (checkDir && !this._closeDir.some((d) => d === newDir)) ||
               (checkDir && this._closeDir.length < 1)
            ) {
               this._changeDir(newDir);
               break;
            }
         }
      }
   }
}
