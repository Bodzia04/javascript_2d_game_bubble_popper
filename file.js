import Player from './player.js';
import Background from './background.js';
import Bubbles from './bubbles.js';
import Enemy from './enemy.js';

//Canvas setup
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0; //рахунок
let gameFrame = 0; //гра Рамка
ctx.font = '40px Georgia';
let gameSpeed = 1;
let gameOver = false;



//Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    mouse.click = true;
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;
});

const player = new Player(canvas, mouse, ctx);
const backgroundObj = new Background(canvas, ctx, gameSpeed);
const bubbles = new Bubbles(canvas, player, ctx, score);
const enemy1 = new Enemy(canvas,    player, ctx, gameOver, score);


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



