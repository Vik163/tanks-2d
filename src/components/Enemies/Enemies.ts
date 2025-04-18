import { PlacesStart } from '@/types/map';
import { Enemy } from './Enemy';
import { placesStartMap_1 } from '@/constants/maps';
import { Dir, NodesMove } from '@/types/main';
import { checkIntersect } from '@/lib/checkIntersect';

export class Enemies {
   ctx: CanvasRenderingContext2D;
   isMobile: boolean;
   _$: (id: string) => HTMLElement | null;
   enemies: Enemy[];
   places: PlacesStart;
   _timer: number;
   _dir: Dir;
   _enemyX: number;
   _enemyY: number;
   _countEnemyL: number;
   _countEnemyM: number;
   _totalEnemyL: number;
   _totalEnemyM: number;
   nodesMove: NodesMove;

   constructor(
      ctx: CanvasRenderingContext2D,
      isMobile: boolean,
      nodesMove: NodesMove,
   ) {
      this.ctx = ctx;
      this._$ = (id: string) => document.getElementById(id)!;
      this.isMobile = isMobile;
      this.enemies = [];
      this.places = placesStartMap_1;
      this._timer = 0;
      this._dir = 'DOWN';
      this._enemyX = 0;
      this._enemyY = 0;
      this._countEnemyL = 0;
      this._countEnemyM = 0;
      this._totalEnemyL = 2;
      this._totalEnemyM = 0;
      this.nodesMove = nodesMove;
      // this.checkCollisions = () =>
      //    checkCollisions(
      //       this._dir,
      //       this._enemyX,
      //       this._enemyY,
      //       'tank',
      //       isMobile,
      //    );
   }
   showInfo() {
      if (this.enemies.length > 0) {
         const infoL = this._$('light_tank');
         if (infoL) infoL.textContent = this._totalEnemyL.toString();
         const infoM = this._$('medium_tank');
         if (infoM) infoM.textContent = this._totalEnemyM.toString();
      }
   }

   update() {
      this._createEnemy();
      this.showInfo();
      if (this.enemies.length > 0) {
         this.enemies.forEach((enemy) => {
            const newNodes = this.nodesMove.filter((n) => enemy !== n);
            enemy.update(newNodes);
         });
      }
   }

   _getRandomInt(max: number) {
      max = Math.floor(max);
      return Math.floor(Math.random() * max) + 1;
   }

   _createEnemy() {
      if (
         this._totalEnemyL > this._countEnemyL &&
         (this._timer === 10000 || this._timer === 0)
      ) {
         // == выбор незанятого места для создания танка ==============
         let isCreate = false;
         while (!isCreate) {
            const randomInt = this._getRandomInt(this.places.length - 1);
            // const randomInt = 3;

            this.places.forEach((p, i) => {
               const coord = this.isMobile ? p.coordMob : p.coord;

               if (randomInt === i + 1) {
                  if (
                     // проверяем свободная ли клетка
                     !checkIntersect(
                        { x: coord[0], y: coord[1] },
                        undefined,
                        this.enemies,
                     )
                  ) {
                     const enemy = new Enemy(
                        this.ctx,
                        this.isMobile,
                        this._dir,
                        coord,
                        this.nodesMove,
                     );
                     this.nodesMove.push(enemy);
                     this.enemies.push(enemy);
                     this._countEnemyL++;

                     this._timer = 0;

                     isCreate = true;
                  }
               }
            });
         }
      }

      this._timer++;
   }

   // _deleteEnemy() {
   //    let nodeCollision: boolean | Block = false;
   //    if (this.enemies.length > 0) {
   //       this.enemies = this.enemies.filter((enemy) => {
   //          if (!nodeCollision) {
   //             console.log('this.enemies:', nodeCollision);

   //             const { enemyX, enemyY } = enemy.update();

   //             this._enemyX = enemyX;
   //             this._enemyY = enemyY;
   //          }
   //          // получить новые координаты выстрела

   //          // проверка столкновений
   //          nodeCollision = this.checkCollisions(
   //             this._dir,
   //             this._enemyX,
   //             this._enemyY,
   //          );

   //          // if (nodeCollision) {
   //          //    console.log('nodeCollision:', nodeCollision);

   //          //    // this._hitNode(nodeCollision);
   //          //    // return false;
   //          // }
   //          return true;
   //       });
   //    }
   // }

   // _hitNode(node: Block | boolean) {
   //    if (typeof node !== 'boolean' && node.part === 'map') {
   //       const arr = this.map[node.coord[1]].map((nd) => {
   //          if (node.type === 'bricks' && nd.coord[0] === node.coord[0])
   //             nd.countHit++;
   //          return nd;
   //       });
   // this._countEnemyL--;
   //       this.map = { ...this.map, [node.coord[1]]: arr };

   //       localStorage.setItem('map_1', JSON.stringify(this.map));
   //    }
   // }

   render() {
      if (this.enemies.length > 0)
         this.enemies.forEach((enemy) => enemy.render());
   }
}
