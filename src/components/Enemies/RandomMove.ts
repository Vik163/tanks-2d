import { BLOCK_WIDTH, BLOCK_WIDTH_MOBILE, directions } from '@/constants/init';
import { checkCollisions } from '@/lib/checkCollisions';
import { getCoordCell } from '@/lib/getCoordCell';
import type {
   CoordCell,
   Dir,
   Directions,
   NodeCollisions,
   NodeName,
   NodesMove,
} from '@/types/main';
import type { Block } from '@/types/map';

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
      type: NodeName,
      isMobile: boolean,
      nodesMove?: NodesMove,
   ) => NodeCollisions;
   _timer: number;
   _timerMoveDown: number;
   _timerDelay: number;
   _timerDownDelay: number;
   _coordCell: CoordCell;
   _countMoveDown: number; // счетчик движений вниз по постоянной координате х (ограничивает количество повторов)
   _closestDirs: [Dir?]; // массив закрытых направлений
   _directions: Directions;
   _randomCellCoord: number; // случайная клетка остановки при движении влево
   _k: number; // коэффициент скорости поворота
   _dirTurn: { dir: 'clockwise' | 'anticlockwise' | ''; angle: number }; // направление и угол поворота
   _forcedTurn: boolean;
   _forcedTMove: boolean;
   _nodesMove: NodesMove;
   isTurn: boolean;

   constructor(isMobile: boolean, dir: Dir, coord: number[]) {
      this.isMobile = isMobile;
      this._dir = dir;
      this._enemyX = coord[0];
      this._enemyY = coord[1];
      this._angle = 180;
      this.blockWidth = isMobile ? BLOCK_WIDTH_MOBILE : BLOCK_WIDTH;
      this.checkCollisions = checkCollisions;
      this._timer = 0;
      this._timerMoveDown = 0;
      this._timerDelay = 2000;
      this._timerDownDelay = 2000;
      this._coordCell = {
         numCellX: 0,
         numCellY: 0,
         cellsX: { start: 0, end: 0 },
         cellsY: { start: 0, end: 0 },
         cellYKey: 0,
      };
      this._directions = directions;
      this._randomCellCoord = 0;
      this._countMoveDown = 0;
      this._closestDirs = [];
      this._k = 0.3;
      this._dirTurn = { dir: '', angle: 180 };
      this._forcedTurn = false;
      this._forcedTMove = false;
      this._nodesMove = [];
      this.isTurn = false;
   }

   update(x: number, y: number, nodesMove: NodesMove) {
      this._enemyX = x;
      this._enemyY = y;
      this._nodesMove = nodesMove;
      // this._forcedTurn = forcedTurn;

      this._coordCell = getCoordCell(this._enemyX, this._enemyY, this.isMobile);

      return {
         dir: this._dir,
         angle: this._angle,
         obstacles: this._checkObstacles(),
         forcedMove: this._forcedTMove,
         isTurn: this.isTurn,
      };
   }

   // == меняет направление и добавляет в массив закрытое направление, управляет счетчиком движения вниз ==
   _changeDir(dir: Dir) {
      this._dir = dir;
      if (dir === 'RIGHT') {
         this._closestDirs.push('RIGHT');
         this._countMoveDown = 0;
         this._handleAngleTurn(90);
      } else if (dir === 'LEFT') {
         this._closestDirs.push('LEFT');
         this._countMoveDown = 0;
         this._handleAngleTurn(-90);
      } else if (dir === 'DOWN') {
         this._closestDirs.push('DOWN');
         this._countMoveDown++;
         this._handleAngleTurn(180);
      } else if (dir === 'UP') {
         this._closestDirs.push('UP');
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
         if (this._angle < 0)
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
         this.isTurn = false;

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
         Math.ceil(this._enemyY),
         'tank',
         this.isMobile,
         this._nodesMove,
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
         this._closestDirs = [];
      }

      if (nodeCollision) {
         this._checkDir();
         this.isTurn = true;

         this._timer = 0; // запускает таймер поворота
      }

      // if (this._forcedTurn && !this._forcedTMove) {
      //    if (this._dir === 'UP') {
      //       this._changeDir('DOWN');
      //    } else if (this._dir === 'DOWN') {
      //       this._changeDir('UP');
      //    } else if (this._dir === 'LEFT') {
      //       this._changeDir('RIGHT');
      //    } else this._changeDir('LEFT');

      //    this._timer = 0; // запускает таймер поворота
      // }

      // случайная клетка остановки и выбора другого направления при движении влево
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
         Math.ceil(this._enemyX),
         Math.ceil(this._enemyY),
         'tank',
         this.isMobile,
         this._nodesMove,
      );

      // если свободно, то идет вниз (в массиве направлений нет ключа 'DOWN' и счетчик не заполнен)
      if (
         (!this._closestDirs.some((d) => d === 'DOWN') ||
            this._closestDirs.length === 0) &&
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
               Math.ceil(this._enemyX),
               Math.ceil(this._enemyY),
               'tank',
               this.isMobile,
               this._nodesMove,
            );

            // если находит свободное направление, которого нет в массиве, то меняет
            if (
               (checkDir && !this._closestDirs.some((d) => d === newDir)) ||
               (checkDir && this._closestDirs.length < 1)
            ) {
               this._changeDir(newDir);
               break;
            }
         }
      }
   }
}
