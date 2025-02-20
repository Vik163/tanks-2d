import { MapGame } from '@/types/map';
import {
   BLOCK_HEIGHT,
   BLOCK_WIDTH,
   CANVAS_HEIGHT,
   CANVAS_WIDTH,
} from '@/constants/init';
import { Maps } from '../Maps/Maps';
import { MyTank } from '../MyTank/MyTank';

export class Main {
   cnv: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   dt: number;
   cnvWidth: number;
   cnvHeight: number;
   blockWidth: number;
   blockHeight: number;
   mapGame: MapGame;
   maps: Maps;
   keyGame: boolean;
   btn: HTMLElement;
   intervalId: string | number | NodeJS.Timeout | undefined;
   _$: (id: string) => HTMLElement | null;
   myTank: MyTank;

   constructor() {
      this._$ = (id: string) => document.getElementById(id)!;
      this.cnv = this._$('canvas') as HTMLCanvasElement;
      this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
      this.dt = 0;
      this.cnvWidth = CANVAS_WIDTH;
      this.cnvHeight = CANVAS_HEIGHT;
      this.blockWidth = BLOCK_WIDTH;
      this.blockHeight = BLOCK_HEIGHT;
      this.mapGame = JSON.parse(localStorage.getItem('map_1')!);
      this.keyGame = false;
      this.btn = document.getElementById('btn_start')!;
      this.intervalId = undefined;
      this.maps = new Maps({ cnv: this.cnv, ctx: this.ctx });
      this.myTank = new MyTank(this.ctx);
   }

   addListeners() {
      // this.$('btn_start')?.addEventListener('click', () => {
      //    this.actionsBtn('START');
      // });

      this._$('btn_editor')?.addEventListener('click', () => {
         if (!this.keyGame) this.maps.openEditor();
      });

      // this.myTank.addListeners();
   }

   actionsBtn(act: string) {
      if (act === 'START') {
         if (this.btn.textContent === 'START') {
            this.keyGame = true;

            this.btn.textContent = 'PAUSE';
         } else {
            if (this.btn.textContent === 'PAUSE') {
               this.btn.textContent = 'PAUSE*';
            } else {
               this.btn.textContent = 'PAUSE';
            }
            if (!this.intervalId) {
               this.intervalId = setInterval(() => {
                  this.btn.classList.toggle('btn_start_active');

                  if (this.btn.textContent === 'PAUSE') {
                     clearInterval(this.intervalId);
                     this.intervalId = undefined;

                     this.btn.classList.remove('btn_start_active');
                  }
               }, 1000);
            }
         }
      } else {
         clearInterval(this.intervalId);
         this.intervalId = undefined;
         this.btn.classList.remove('btn_start_active');

         this.keyGame = false;
         this.btn.textContent = 'START';
      }

      return this.keyGame;
   }

   update(dt: number) {
      this.dt = dt;

      this.myTank.update(dt);
   }

   render() {
      this.cnv.width = this.cnvWidth;
      this.cnv.height = this.cnvHeight;

      this.maps.renderMap();
      this.myTank.renderMyTank();
   }
}
// const playerSpeed = 200;
// const bulletSpeed = 500;
// const enemySpeed = 100;

// const player = {
//    pos: [0, 0],
//    sprite: new Sprite(
//       './assets/images/maps/place_start.png',
//       [0, 0],
//       [39, 39],
//       16,
//       [0, 1],
//    ),
// };

// const bullets = [];
// const enemies = [];
// const explosions = [];

// let lastFire = Date.now();
// let gameTime = 0;
// let isGameOver;
// let terrainPattern;

// // The score
// const score = 0;
// const scoreEl = document.getElementById('score');

// const $ = (id) => document.getElementById(id);

// const cnv = $('canvas');
// const ctx = cnv.getContext('2d');

// const resources = window.resources;

// resources.load(arrSrcImg);

// function Sprite(url, pos, size, speed, frames, dir, once) {
//    this.pos = pos;
//    this.size = size;
//    this.speed = typeof speed === 'number' ? speed : 0;
//    this.frames = frames;
//    this._index = 0;
//    this.url = url;
//    this.dir = dir || 'horizontal';
//    this.once = once;
// }

// Sprite.prototype.update = function (dt) {
//    this._index += this.speed * dt;
// };

// Sprite.prototype.render = function (ctx) {
//    let frame;

//    if (this.speed > 0) {
//       const max = this.frames.length;
//       const idx = Math.floor(this._index);
//       frame = this.frames[idx % max];

//       if (this.once && idx >= max) {
//          this.done = true;
//          return;
//       }
//    } else {
//       frame = 0;
//    }

//    let x = this.pos[0];
//    let y = this.pos[1];

//    if (this.dir === 'vertical') {
//       y += frame * this.size[1];
//    } else {
//       x += frame * this.size[0];
//    }

//    ctx.drawImage(
//       resources.get(this.url),
//       x,
//       y,
//       this.size[0],
//       this.size[1],
//       0,
//       0,
//       this.size[0],
//       this.size[1],
//    );
// };

// function handleInput(dt) {
//    document.addEventListener('keydown', (e) => {
//       if (e.key === 'DOWN') {
//          player.pos[1] += playerSpeed * dt;
//       }

//       if (e.key === 'UP') {
//          player.pos[1] -= playerSpeed * dt;
//       }

//       if (e.key === 'LEFT') {
//          player.pos[0] -= playerSpeed * dt;
//       }

//       if (e.key === 'RIGHT') {
//          player.pos[0] += playerSpeed * dt;
//       }

//       if (e.key === 'SPACE' && !isGameOver && Date.now() - lastFire > 100) {
//          const x = player.pos[0] + player.sprite.size[0] / 2;
//          const y = player.pos[1] + player.sprite.size[1] / 2;

//          bullets.push({
//             pos: [x, y],
//             dir: 'forward',
//             sprite: new Sprite(
//                './assets/images/maps/block_bricks_2.png',
//                [0, 39],
//                [18, 8],
//             ),
//          });
//          bullets.push({
//             pos: [x, y],
//             dir: 'up',
//             sprite: new Sprite(
//                './assets/images/maps/block_bricks_2.png',
//                [0, 50],
//                [9, 5],
//             ),
//          });
//          bullets.push({
//             pos: [x, y],
//             dir: 'down',
//             sprite: new Sprite(
//                './assets/images/maps/block_bricks_2.png',
//                [0, 60],
//                [9, 5],
//             ),
//          });

//          lastFire = Date.now();
//       }
//    });
// }

// const x = player.pos[0] + player.sprite.size[0] / 2;
// const y = player.pos[1] + player.sprite.size[1] / 2;

// bullets.push({
//    pos: [x, y],
//    dir: 'forward',
//    sprite: new Sprite(
//       './assets/images/maps/block_bricks_2.png',
//       [0, 39],
//       [18, 8],
//    ),
// });
// bullets.push({
//    pos: [x, y],
//    dir: 'up',
//    sprite: new Sprite(
//       './assets/images/maps/block_bricks_2.png',
//       [0, 50],
//       [9, 5],
//    ),
// });
// bullets.push({
//    pos: [x, y],
//    dir: 'down',
//    sprite: new Sprite(
//       './assets/images/maps/block_bricks_2.png',
//       [0, 60],
//       [9, 5],
//    ),
// });

// lastFire = Date.now();

// function updateEntities(dt) {
//    // Update the player sprite animation
//    player.sprite.update(dt);

//    // Update all the bullets
//    for (let i = 0; i < bullets.length; i++) {
//       const bullet = bullets[i];

//       switch (bullet.dir) {
//          case 'up':
//             bullet.pos[1] -= bulletSpeed * dt;
//             break;
//          case 'down':
//             bullet.pos[1] += bulletSpeed * dt;
//             break;
//          default:
//             bullet.pos[0] += bulletSpeed * dt;
//       }

//       // Remove the bullet if it goes offscreen
//       if (
//          bullet.pos[1] < 0 ||
//          bullet.pos[1] > cnv.height ||
//          bullet.pos[0] > cnv.width
//       ) {
//          bullets.splice(i, 1);
//          i--;
//       }
//    }

//    // Update all the enemies
//    for (let i = 0; i < enemies.length; i++) {
//       enemies[i].pos[0] -= enemySpeed * dt;
//       enemies[i].sprite.update(dt);

//       // Remove if offscreen
//       if (enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
//          enemies.splice(i, 1);
//          i--;
//       }
//    }

//    // Update all the explosions
//    for (let i = 0; i < explosions.length; i++) {
//       explosions[i].sprite.update(dt);

//       // Remove if animation is done
//       if (explosions[i].sprite.done) {
//          explosions.splice(i, 1);
//          i--;
//       }
//    }
// }

// function update(dt) {
//    gameTime += dt;

//    handleInput(dt);
//    updateEntities(dt);

//    // It gets harder over time by adding enemies using this
//    // equation: 1-.993^gameTime
//    if (Math.random() < 1 - Math.pow(0.993, gameTime)) {
//       enemies.push({
//          pos: [cnv.width, Math.random() * (cnv.height - 39)],
//          sprite: new Sprite(
//             './assets/images/maps/block_bricks_2.png',
//             [0, 78],
//             [80, 39],
//             6,
//             [0, 1, 2, 3, 2, 1],
//          ),
//       });
//    }

//    // checkCollisions();
// }

// function render() {
//    ctx.fillStyle = terrainPattern;
//    ctx.fillRect(0, 0, cnv.width, cnv.height);

//    // Render the player if the game isn't over
//    if (!isGameOver) {
//       renderEntity(player);
//    }

//    renderEntities(bullets);
//    renderEntities(enemies);
//    renderEntities(explosions);
// }

// function renderEntities(list) {
//    for (let i = 0; i < list.length; i++) {
//       renderEntity(list[i]);
//    }
// }

// function renderEntity(entity) {
//    ctx.save();
//    ctx.translate(entity.pos[0], entity.pos[1]);
//    entity.sprite.render(ctx);
//    ctx.restore();
// }
