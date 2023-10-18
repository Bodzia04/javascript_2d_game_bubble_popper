import Player from './player.js';
import Background from './background.js';
import Bubbles from './bubbles.js';
import Enemy from './enemy.js';
import Interactivity from './interactivity.js'

//Canvas setup
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
let canvasPosition = canvas.getBoundingClientRect();
canvas.width = 800;
canvas.height = 500;

let score = 0; //рахунок
let gameFrame = 0; //гра Рамка
ctx.font = '40px Georgia';
let gameSpeed = 1;
let gameOver = false;

const interactivity = new Interactivity(canvas, canvasPosition);
interactivity.handleInteractivity()
const player = new Player(canvas, interactivity.mouse, ctx);
const backgroundObj = new Background(canvas, ctx, gameSpeed);
const bubbles = new Bubbles(canvas, player, ctx, score);
const enemy1 = new Enemy(canvas, player, ctx, gameOver, score);

//Animation loop
// FIXME: підібрати кращу назву
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundObj.handleBackground();
    bubbles.handleBubbles(gameFrame)
    player.update();
    player.draw();
    enemy1.handleEnemies(gameFrame);
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + bubbles.score, 10, 50);
    gameFrame++;
    if(!enemy1.gameOver) requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})

// TODO:
// interactivity
// + Player
// + backgrounds
// + Bubbles
// + Enemies

//FIXME:
// 1. чому в режимі спокую голова рибкі опускаїться.
// 2. Бульбашка лопає за надто ранно. Коли торкає живота рибки.
// 3. знайти баг чому картинка хвилі не докінця з'єднуїться.
// 4. рішити проблему з швидкістю ворога. Від другого появлення ворога швидкість одинакова.


// for perspectiv:
//1. різний розмір бульбашок.
//2. контроль клавішами.
//3. вийшовши з води бульбашка лопає.

//закінчив роботу над:
    

