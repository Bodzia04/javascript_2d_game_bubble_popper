import Game from './game.js'
import Player from './player.js';
import Bubbles from './bubbles.js';
import Enemy from './enemy.js';
import Interactivity from './interactivity.js';
import Background from './background.js';


const game = new Game();
const interactivity = new Interactivity(game);
interactivity.handleInteractivity()
const player = new Player(game, interactivity.mouse);
const backgroundObj = new Background(game);
const bubbles = new Bubbles(game, player);
const enemy1 = new Enemy(game, player);

//Animation loop
// FIXME: підібрати кращу назву
// function animate(){
//     game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
//     backgroundObj.handleBackground();
//     bubbles.handleBubbles(game.gameFrame)
//     player.update();
//     player.draw();
//     enemy1.handleEnemies(game.gameFrame);
//     game.ctx.fillStyle = 'black';
//     game.ctx.fillText('score: ' + bubbles.score, 10, 50);
//     game.gameFrame++;
//     if(!enemy1.gameOver) requestAnimationFrame(animate);
// }
game.addFunction(backgroundObj.handleBackground.bind(backgroundObj));
game.addFunction(bubbles.handleBubbles.bind(bubbles));
game.addFunction(enemy1.handleEnemies.bind(enemy1));
game.addFunction(player.draw.bind(player));
game.addFunction(player.update.bind(player));
game.animate();
// game.start();

window.addEventListener('resize', function(){
    game.canvasPosition = game.canvas.getBoundingClientRect();
})

// TODO:
// + interactivity
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
    

